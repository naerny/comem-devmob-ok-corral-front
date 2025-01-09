import axios from "axios";
import userToken from "@/utils/localStorage.js";
import sessionCode from "@/utils/localStorage.js";
import sessionId from "@/utils/localStorage.js";

export const logout = async () => {
  const token = userToken.userToken.getUserToken();
  const code = sessionCode.sessionCode.getSessionCode();
  const id = sessionId.sessionId.getSessionId();
  console.log("code", code);
  console.log("id", id);
  console.log("token", token);

  try {
    // Première étape : déconnexion de l'utilisateur
    console.log("déconnexion utilisateur");
    await axios.post(
      "https://comem-archioweb-ok-corral-api.onrender.com/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    userToken.userToken.removeUserToken();

    // Deuxième étape : fermeture de la session
    if (code) {
      console.log("fermeture session");
      if (id) {
        await axios.post(
          `https://comem-archioweb-ok-corral-api.onrender.com/session/close/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // Nettoyage du localStorage seulement après que tout est réussi
      sessionId.sessionId.removeSessionId();
      sessionCode.sessionCode.removeSessionCode();
    }
    return { success: true, message: "Déconnexion réussie" };
  } catch (error) {
    console.error(
      "Erreur lors de la déconnexion:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
