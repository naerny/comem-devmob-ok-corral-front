import WSServer from "./WSServer.mjs";
import WSServerError from "./WSServerError.mjs";

export default class WSServerPubSub extends WSServer {
  channels = new Map();
  rpcs = new Map();

  /**
   * Add a channel to the server
   *
   * @param {string} chan - The channel name
   * @param {object} options - The channel options
   * @param {boolean} [options.usersCanPub=true] - If users can publish on this channel
   * @param {boolean} [options.usersCanSub=true] - If users can subscribe to this channel
   * @param {function} [options.hookPub=(msg, client, wsServer) => msg] - The hook to call before publishing a message
   * It must return the message to send to the all clients of the channel.
   * The callback is called with the message to publish, the client metadata and the server instance.
   * It can throw a WSServerError to send an error to the client
   * @param {function} [options.hookSub=(client, wsServer) => true] - The hook to call before subscribing a client to the channel
   * It must return true if the client can subscribe to the channel, false otherwise.
   * The callback is called with the client metadata and the server instance
   * @param {function} [options.hookUnsub=(client, wsServer) => null] - The hook to call before unsubscribing a client to the channel
   * The return value does not matter.
   * The callback is called with the client metadata and the server instance
   *
   * @example
   * wsServer.addChannel('chat', {
   *   usersCanPub: true,
   *   usersCanSub: true,
   *   hookPub: (msg, client, wsServer) => {
   *     return {...msg, from: client.username, time: Date.now()}
   *   },
   * });
   */
  addChannel(chan, {
    usersCanPub = true,
    usersCanSub = true,
    hookPub = (msg, client, wsServer) => msg,
    hookSub = (client, wsServer) => true,
    hookUnsub = (client, wsServer) => null,
  } = {}) {
    if (this.channels.has(chan)) return false;
    this.channels.set(chan, {
      usersCanPub,
      usersCanSub,
      hookPub,
      hookSub,
      hookUnsub,
      clients: new Set(),
    });
    return true;
  }

  /**
   * Add a RPC to the server
   *
   * @param {string} name - The RPC name
   * @param {function} callback - The RPC callback. It must return the response to the client.
   * The callback is called with the data sent by the client, the client metadata and the server instance.
   * The callback can throw a WSServerError to send an error to the client
   *
   * @example
   * wsServer.addRpc('hello', (data, client, wsServer) => {
   *   if (!data?.name) throw new WSServerError('Name is required');
   *   return `Hello from WS server ${data.name}`;
   * });
   */
  addRpc(name, callback) {
    if (this.rpcs.has(name)) return false;
    this.rpcs.set(name, callback);
    return true;
  }

  removeChannel(chanName) {
    if (!this.channels.has(chanName)) return false;
    const chan = this.channels.get(chanName);
    // Call the unsub hook for all clients
    for (const client of chan.clients) {
      chan.hookUnsub(this.clients.get(client), this);
    }
    this.channels.delete(chanName);
    return true;
  }

  removeRpc(name) {
    if (!this.rpcs.has(name)) return false;
    this.rpcs.delete(name);
    return true;
  }

  onMessage(client, message) {
    message = message.toString();
    let data;
    try{
      data = JSON.parse(message)
    } catch(e) {
      return this.sendError(client, 'Invalid data');
    }

    if (data.action != 'sub' && data.action != 'pub' && data.action != 'unsub' && data.action != 'rpc') {
      return this.sendError(client, 'Invalid action');
    }

    if (data.action === 'rpc') {
      return this.manageRpc(client, data);
    } else {
      return this.managePubSub(client, data);
    }
  }

  managePubSub(client, data) {
    if (typeof data?.chan !== 'string') {
      return this.sendError(client, 'Invalid chan');
    }

    if (typeof data?.id !== 'number') {
      return this.sendError(client, 'Invalid id or id is missing');
    }

    if (data.action === 'unsub') {
      if (!this.channels.has(data.chan)) {
        return this.sendUnsubError(client, data.id, data.chan, 'Unknown chan');
      };
      const chan = this.channels.get(data.chan);

      if (!chan.clients.has(client)) {
        return this.sendUnsubError(client, data.id, data.chan, 'Not subscribed');
      }

      chan.hookUnsub(this.clients.get(client), this);
      chan.clients.delete(client);
      return this.sendUnsubSuccess(client, data.id, data.chan, 'Unsubscribed');
    }

    if (data.action === 'sub') {
      if (!this.channels.has(data.chan)) {
        return this.sendSubError(client, data.id, data.chan, 'Unknown chan');
      }

      const chan = this.channels.get(data.chan);

      if (!chan.usersCanSub) {
        return this.sendSubError(client, data.id, data.chan, 'Users cannot sub on this chan');
      }

      if (!chan.hookSub(this.clients.get(client), this)) {
        return this.sendSubError(client, data.id, data.chan, 'Subscription denied');
      }

      chan.clients.add(client);
      return this.sendSubSuccess(client, data.id, data.chan, 'Subscribed');
    }

    if (data.action === 'pub') {
      if (!this.channels.has(data.chan)) {
        return this.sendPubError(client, data.id, data.chan, 'Unknown chan');
      };

      const chan = this.channels.get(data.chan);

      if (!chan.usersCanPub) {
        return this.sendPubError(client, data.id, data.chan, 'Users cannot pub on this chan');
      }

      let dataToSend;
      try {
        dataToSend = chan.hookPub(data.msg, this.clients.get(client), this);
      } catch (e) {
        if (!(e instanceof WSServerError)) this.log(e.name +': ' + e.message);
        const response = e instanceof WSServerError ? e.message : 'Server error';
        return this.sendPubError(client, data.id, data.chan, response);
      }

      this.sendPubSuccess(client, data.id, data.chan, 'Message sent');
      return this.pub(data.chan, dataToSend);
    }
  }

  manageRpc(client, data) {
    if (typeof data?.name !== 'string') {
      return this.sendError(client, 'Invalid rpc name');
    }
    if (!data?.data) {
      return this.sendError(client, 'Data is required');
    }
    if (typeof data?.id !== 'number') {
      return this.sendError(client, 'Invalid rpc id');
    }

    const rpc = this.rpcs.get(data.name);

    if (!rpc) {
      return this.sendRpcError(client, data.id, data.name, 'Unknown rpc');
    }

    let response;
    try {
      response = rpc(data.data, this.clients.get(client), this);
    } catch (e) {
      if (!(e instanceof WSServerError)) this.log(e.name +': ' + e.message);
      const response = e instanceof WSServerError ? e.message : 'Server error';
      return this.sendRpcError(client, data.id, data.name, response);
    }

    return this.sendRpcSuccess(client, data.id, data.name, response);
  }

  pub(chanName, msg) {
    const chan = this.channels.get(chanName);
    if (!chan) return false;

    const message = JSON.stringify({
      action: 'pub',
      chan: chanName,
      msg,
    });

    for (const client of chan.clients) {
      this.send(client, message);
    }

    return true;
  }

  onClose(client) {
    for (const chan of this.channels.values()) {
      if (chan.clients.has(client)) {
        chan.hookUnsub(this.clients.get(client), this);
        chan.clients.delete(client);
      }
    }
    super.onClose(client);
  }

  sendError(client, msg) {
    this.send(client, JSON.stringify({action: 'error', msg}));
    return false;
  }

  sendRpcError(client, id, name, response) {
    this.sendRpc(client, id, name, response, 'error');
    return false;
  }

  sendRpcSuccess(client, id, name, response) {
    this.sendRpc(client, id, name, response);
    return true;
  }

  sendRpc(client, id, name, response, type = 'success') {
    this.send(client, JSON.stringify({
      action: 'rpc',
      id,
      name,
      type,
      response,
    }));
  }

  sendSubError(client, id, chan, response) {
    this.sendSubConfirm(client, id, chan, response, 'error');
    return false;
  }

  sendSubSuccess(client, id, chan, response) {
    this.sendSubConfirm(client, id, chan, response);
    return true;
  }

  sendSubConfirm(client, id, chan, response, type = 'success') {
    this.send(client, JSON.stringify({
      action: 'sub',
      id,
      chan,
      type,
      response,
    }));
  }

  sendUnsubError(client, id, chan, response) {
    this.sendUnsubConfirm(client, id, chan, response, 'error');
    return false;
  }

  sendUnsubSuccess(client, id, chan, response) {
    this.sendUnsubConfirm(client, id, chan, response);
    return true;
  }

  sendUnsubConfirm(client, id, chan, response, type = 'success') {
    this.send(client, JSON.stringify({
      action: 'unsub',
      id,
      chan,
      type,
      response,
    }));
  }

  sendPubError(client, id, chan, response) {
    this.sendPubConfirm(client, id, chan, response, 'error');
    return false;
  }

  sendPubSuccess(client, id, chan, response) {
    this.sendPubConfirm(client, id, chan, response);
    return true;
  }

  sendPubConfirm(client, id, chan, response, type = 'success') {
    this.send(client, JSON.stringify({
      action: 'pub-confirm',
      id,
      chan,
      type,
      response,
    }));
  }

  sendAuthFailed(client) {
    this.send(client, JSON.stringify({action: 'auth-failed'}));
  }

  sendAuthSuccess(client) {
    this.send(client, JSON.stringify({action: 'auth-success'}));
  }

}