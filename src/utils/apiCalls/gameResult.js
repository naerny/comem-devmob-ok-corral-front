import axios from "axios";
import { userToken } from '@/utils/localStorage.js';
import { showModal } from '@/utils/modalManager.js';
import { useSessionStore } from "@/stores/storeSession.js";
const { getSession } = useSessionStore();

const player1 = JSON.parse(localStorage.getItem('player1_result'));
const player2 = JSON.parse(localStorage.getItem('player2_result'));


export const gameResult = async () => {
    const token = userToken.getUserToken();

    const data = new FormData();
    data.append("gameId", getSession().id);
    data.append("team1Id", player1);
    data.append("team2Id", player2);
    data.append("team1Timestamp", player1.triggerTime);
    data.append("team2Timestamp", player2.triggerTime);

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/game/result`,
            data,    
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