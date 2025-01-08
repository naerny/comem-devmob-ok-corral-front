import axios from "axios";
import userToken from "@/utils/localStorage.js";

const login = async (usernameValue, passwordValue) => {
  const data = new FormData();
  data.append("username", usernameValue);
  data.append("password", passwordValue);

  console.log("data", data);

  try {
    const response = await axios.post(
      "https://comem-archioweb-ok-corral-api.onrender.com/user/login",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export default login;
