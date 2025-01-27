import axios from "axios";
import { userToken } from '@/utils/localStorage.js';
import { showModal } from '@/utils/modalManager.js';
import { useSessionStore } from "@/stores/storeSession.js";
import { useWebsocket } from "@/composables/useWebsocket.js";
const { sub } = useWebsocket();

export const sessionValidateCode = async (codeToValidate) => {
    const token = userToken.getUserToken();

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
        sub(response.data.session._id);
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