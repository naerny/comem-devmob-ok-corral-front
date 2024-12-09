import storeSessionData from '../stores/sessionDataStore.js';

export const sessionStorage = {
    // if a property value is updated, the localStorage is updated
    update: function (key, value) {
        sessionStorage.datas[key] = value;
        localStorage.setItem(`session${sessionStorage.session_id}`, JSON.stringify(sessionStorage.datas));
        console.log('update');
    },    

    createSorage: function () {
        if (!localStorage.getItem(`session${storeSessionData.session_id}`)) {
            localStorage.setItem(`session${storeSessionData.session_id}`, JSON.stringify(storeSessionData));
        }
        console.log('createSorage');
    },
}
