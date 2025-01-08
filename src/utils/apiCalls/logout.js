import axios from "axios";
import userToken from '@/utils/localStorage.js';

export const logout = async () => {    
    const token = userToken.userToken.getUserToken();

    try {
        const response = await axios.post(
            "https://comem-archioweb-ok-corral-api.onrender.com/user/logout",            
            {
                headers: {                    
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Response:", response.data);
        userToken.userToken.removeUserToken();
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