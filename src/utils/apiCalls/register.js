import axios from "axios";
import userToken from '@/utils/localStorage.js';

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
            "https://comem-archioweb-ok-corral-api.onrender.com/user",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            }
        );

        console.log("Response:", response.data);
        userToken.userToken.setUserToken(response.data.token);
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