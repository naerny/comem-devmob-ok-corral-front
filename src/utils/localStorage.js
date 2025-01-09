import storeSessionData from "../stores/sessionDataStore.js";

const sessionStorage = {
  // if a property value is updated, the localStorage is updated
  update: function (key, value) {
    sessionStorage.datas[key] = value;
    localStorage.setItem(
      `session${sessionStorage.session_id}`,
      JSON.stringify(sessionStorage.datas)
    );
    console.log("update");
  },

  createSorage: function () {
    if (!localStorage.getItem(`session${storeSessionData.session_id}`)) {
      localStorage.setItem(
        `session${storeSessionData.session_id}`,
        JSON.stringify(storeSessionData)
      );
    }
    console.log("createSorage");
  },
};

const userToken = {
  setUserToken: function (token) {
    localStorage.setItem("userToken", token);
    console.log("User token set:", token);
  },
  getUserToken: function () {
    return localStorage.getItem("userToken");
  },
  removeUserToken: function () {
    localStorage.removeItem("userToken");
    console.log("User token removed");
  },
};

const sessionCode = {
  setSessionCode: function (code) {
    localStorage.setItem("sessionCode", code);
    console.log("Session code set:", code);
  },
  getSessionCode: function () {
    return localStorage.getItem("sessionCode");
  },
  removeSessionCode: function () {
    localStorage.removeItem("sessionCode");
    console.log("Session code removed");
  },
};

const sessionId = {
  setSessionId: function (id) {
    localStorage.setItem("sessionId", id);
    console.log("Session id set:", id);
  },
  getSessionId: function () {
    return localStorage.getItem("sessionId");
  },
  removeSessionId: function () {
    localStorage.removeItem("sessionId");
    console.log("Session id removed");
  },
};

export default { sessionStorage, userToken, sessionCode, sessionId };
