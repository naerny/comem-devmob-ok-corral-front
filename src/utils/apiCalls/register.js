import axios from "axios";
import {userToken} from '@/utils/localStorage.js';
import router from '@/router/index.js';
import { showModal } from '@/utils/modalManager.js';

const register = async (
    usernameValue,
    emailValue,
    passwordValue
) => {    
    const data = new FormData();
    data.append("username", usernameValue);
    data.append("email", emailValue);
    data.append("password", passwordValue);

    console.log("data", data);

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }
        );

        console.log("Response:", response.data);
        userToken.setUserToken(response.data.token);
        showModal(response.data.message); 
        router.push('/');
        // Handle success (e.g., redirecting to another page)
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );
        // Handle error (e.g., showing an error message)
    }
};

export default register;