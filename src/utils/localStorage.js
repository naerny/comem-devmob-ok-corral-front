export const userToken = {
    setUserToken: function (token) {
        localStorage.setItem('userToken', token);
        console.log('User token set:', token);
    },
    getUserToken: function () {
        return localStorage.getItem('userToken');
    },
    removeUserToken: function () {
        localStorage.removeItem('userToken');
        console.log('User token removed');
    }
};

export const currentSession = {
    setSession: function (id, code) {
        const session = { id, code };
        localStorage.setItem('currentSession', JSON.stringify(session));
        console.log('Current session set:', session);
    },
    getSession: function () {
        const session = localStorage.getItem('currentSession');        
        return localStorage.getItem('currentSession') ? JSON.parse(session) : null;
    },
    removeSession: function () {
        localStorage.removeItem('currentSession');
        console.log('Current session removed');
    }
};

export const currentSessionPlayers = {
    setSessionPlayers: function (players) {
        localStorage.setItem('sessionPlayers', JSON.stringify(players));
        console.log('Session players set:', players);
    },
    getSessionPlayers: function () {
        const players = localStorage.getItem('sessionPlayers');
        return localStorage.getItem('sessionPlayers') ? JSON.parse(players) : null;
    },
    removeSessionPlayers: function () {
        localStorage.removeItem('sessionPlayers');
        console.log('Session players removed');
    },

    setPlayerResult: function (player, results) {
        const playerResult = { player, results };
        localStorage.setItem(`${player}_result`, JSON.stringify(playerResult));
        console.log('Player result set:', playerResult);
    },
    getPlayerResult: function (player) {
        const playerResult = localStorage.getItem(`${player}`);
        return localStorage.getItem(`${player}`) ? JSON.parse(playerResult) : null;
    },
    removePlayerResult: function (player) {
        localStorage.removeItem(`${player}`);
        console.log('Player result removed');
    }
};

// export { sessionStorageUtils, userToken, currentSession };

