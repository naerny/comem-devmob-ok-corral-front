import axios from "axios";
import { userToken } from '@/utils/localStorage.js';
import { showModal } from '@/utils/modalManager.js';
import { useSessionStore } from "@/stores/storeSession.js";
import { useWebsocket } from "@/composables/useWebsocket.js";
const { sub } = useWebsocket();

export const createSession = async () => {
    const token = userToken.getUserToken();

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/session`,
            {}, // Empty body          
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Response:", response.data);      
        const { setSession } = useSessionStore();
        setSession(response.data.session._id, response.data.session.session_code);
        const { setSessionPlayers } = useSessionStore();
        sub(response.data.session._id);

        // count admin in session
        // setSessionPlayers(1);
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