import { redirect } from "react-router-dom";
import notify from "../../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const reservationLoader = async () => {
  try {
    const response = await fetch(`${URL}reservation`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status !== 200) {
      return redirect("/acces_refuse");
    }
    return null;
  } catch (err) {
    console.error("Fetch profile error:", err);
    notify(
      "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard.",
      "error"
    );
    throw err;
  }
};

export default reservationLoader;
