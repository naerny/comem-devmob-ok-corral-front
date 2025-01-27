import axios from "axios";
import { userToken, currentSession } from '@/utils/localStorage.js';
import { showModal } from '@/utils/modalManager.js';
import { wsClient } from '@/composables/useWebsocket.js';
import { useSessionStore } from "@/stores/storeSession.js";
import { useWebsocket } from "@/composables/useWebsocket.js";
const { sub } = useWebsocket();

export const sessionValidateCode = async (codeToValidate) => {
    const token = userToken.getUserToken();
    //  const codeToValidate = currentSession.getSession().code;

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/session/validate/${codeToValidate}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const { setSession } = useSessionStore();
        setSession(response.data.session._id, response.data.session.session_code);

        // wsClient.sub(response.data.session._id, (message) => {
        //     console.log("wsClient: ", message);
        // });   
        sub(response.data.session._id);
        // wsClient.pub(response.data.session._id,  'Skibidy' );
        console.log("response.data: ", response.data);
        showModal(response.data.message);
        return response.data;
        // Handle success (e.g., redirecting to another page)
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );
        showModal(error.response ? error.response.data : error.message);
        // Handle error (e.g., showing an error message)
    }
};