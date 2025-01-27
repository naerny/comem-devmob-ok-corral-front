import axios from "axios";
import { userToken } from '@/utils/localStorage.js';
import { showModal } from '@/utils/modalManager.js';

export const createGame = async () => {
    const token = userToken.getUserToken();

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/game`,
           {},    
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Response:", response.data);
        localStorage.setItem('gameId', response.data.game._id);     
        showModal(response.data.message);
        return response.data;
        // Handle success (e.g., redirecting to another page)
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );
        showModal(error.message);
        // Handle error (e.g., showing an error message)
    }
};