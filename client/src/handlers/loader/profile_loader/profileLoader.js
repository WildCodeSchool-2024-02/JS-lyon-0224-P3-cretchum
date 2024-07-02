import notify from "../../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const profileLoader = async ({ params }) => {
  try {
    const response = await fetch(`${URL}/users/${params.id}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (response.status !== 200) {
      notify(
        "Erreur lors de la récupération des données du profil !",
        "error"
      );
      throw new Error("Failed to fetch profile data");
    }
    const data = await response.json();
    notify(
      "Les données du profil ont été récupérées avec succès.",
      "success"
    );
    return data;
  } catch (err) {
    console.error("Fetch profile error:", err);
    notify(
      "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard.",
      "error"
    );
    throw err;
  }
};

export default profileLoader;
