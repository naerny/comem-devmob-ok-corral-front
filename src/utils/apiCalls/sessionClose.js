import axios from "axios";
import { userToken } from '@/utils/localStorage.js';
import { showModal } from '@/utils/modalManager.js';
import { wsClient } from "@/composables/useWebsocket";

export const closeSession = async (sessionId) => {
    const token = userToken.getUserToken();

    try {
        wsClient.pub(sessionId, {action: 'closeSession'});
        
        const response = await axios.patch(
            `${import.meta.env.VITE_API_URL}/session/close/${sessionId}`,
            {}, // Empty body          
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Response:", response.data);        
            
        
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