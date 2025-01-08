import axios from "axios";
import userToken from "@/utils/localStorage.js";

const createSession = async () => {
  try {
    const response = await axios.post(
      "https://comem-archioweb-ok-corral-api.onrender.com/session",
      {
        headers: {
          Authorization: `Bearer ${userToken.userToken.getUserToken()}`,
        },
      }
    );
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    // Handle error (e.g., showing an error message)
  }
};

export default createSession;
