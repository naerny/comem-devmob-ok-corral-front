import axios from "axios";
import { useLogInStore } from '@/stores/storeUserLogIn.js';
import { showModal } from '@/utils/modalManager.js';
import router from '@/router/index.js';

const login = async (
    usernameValue,
    passwordValue
) => {    
    const data = new FormData();
    data.append("username", usernameValue);
    data.append("password", passwordValue);

    console.log("data", data);

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/user/login`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }
        );

        console.log("Response:", response.data);        
        const { setToken } = useLogInStore();
        setToken(response.data.token);                 
        router.push({ name: 'home' });        
        showModal(response.data.message);   
        // Handle success (e.g., redirecting to another page)
    } catch (error) {
        console.error(
            "Error:",
            error.response ? error.response.data : error.message
        );        
        showModal(error.response.data.error);
        // Handle error (e.g., showing an error message)
    }
};

export default login;