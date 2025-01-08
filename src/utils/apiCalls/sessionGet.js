import axios from "axios";
import userToken from '@/utils/localStorage.js';

export const getSessions = async () => {    

    try {
        const response = await axios.post(
            "https://comem-archioweb-ok-corral-api.onrender.com/session",            
            {
                headers: {
                    Authorization: `Bearer ${userToken.userToken.getUserToken()}`,
                },
            }
        );

        console.log("Response:", response.data);
        return response.data;
        // Handle success (e.g., redirecting to another page)
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );
        // Handle error (e.g., showing an error message)
    }
};