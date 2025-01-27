import axios from "axios";
import {userToken} from '@/utils/localStorage.js';
import { useLogInStore } from '@/stores/storeUserLogIn.js';
import { showModal } from '@/utils/modalManager.js';
import router from '@/router/index.js';

export const logout = async () => {    
    const token = userToken.getUserToken();


    if (!token) {
      throw new Error('No authentication token found');
    }

    try {
       const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/logout`,
            {}, // Empty body
            {
                headers: {     
                    "Content-Type": "application/json",               
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Response:", response.data);
        // userToken.removeUserToken();
        const { setToken } = useLogInStore();
        setToken(null);
        showModal(response.data.message);        
        router.push('/');
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