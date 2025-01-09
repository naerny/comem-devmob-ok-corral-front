import axios from "axios";
import userToken from "@/utils/localStorage.js";
import sessionCode from "@/utils/localStorage.js";
import sessionId from "@/utils/localStorage.js";

const createSession = async () => {
  try {
    const response = await axios.post(
      "https://comem-archioweb-ok-corral-api.onrender.com/session",
      {},
      {
        headers: {
          Authorization: `Bearer ${userToken.userToken.getUserToken()}`,
        },
      }
    );
    console.log("Response:", response.data);
    const sessionCode = response.data.session.session_code;
    const sessionId = response.data.session.session_id;
    sessionCode.setSessionCode(sessionCode);
    sessionId.setSessionId(sessionId);
    console.log("sessionCode", sessionCode);
    return sessionCode;
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    // Handle error (e.g., showing an error message)
  }
};

export default createSession;
