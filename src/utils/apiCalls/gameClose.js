import axios from "axios";
import { userToken } from '@/utils/localStorage.js';
import { showModal } from '@/utils/modalManager.js';

export const closeGame = async () => {
    const token = userToken.getUserToken();
    const gameId = localStorage.getItem('gameId');

    try {
        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/game/${gameId}`,
           {},    
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Response:", response.data);
        localStorage.removeItem('gameId');
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