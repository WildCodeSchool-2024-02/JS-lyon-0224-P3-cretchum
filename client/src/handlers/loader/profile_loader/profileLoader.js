import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;

const profileLoader = async ({ params }) => {
  try {
    const response = await fetch(`${URL}homestructure/${params.id}`, {
      method: "GET",
      credentials: "include",
    });
    if (response.status === 401 || response.status === 403) {
      return redirect("/acces_refuse");
    }
    if (response.status !== 200) {
      toast.error("Erreur lors de la récupération des données du profil !");
      throw new Error("Failed to fetch profile data");
    }
    const data = await response.json();
    toast.success("Les données du profil ont été récupérées avec succès.");
    return data;
  } catch (err) {
    console.error("Fetch profile error:", err);
    return toast.error(
      "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard."
    );
  }
};

export default profileLoader;
