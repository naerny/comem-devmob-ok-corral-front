import axios from "axios";
import {userToken} from '@/utils/localStorage.js';

export const getUsers = async () => {    
     const token = userToken.getUserToken();

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/user`,            
            {
                headers: {
                    Authorization: `Bearer ${token}`,
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