import notify from "../../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const homeStructureLoader = async ({ params }) => {
  try {
    const response = await fetch(`${URL}homestructure/${params.id}`);
    if (response.status !== 200) {
      notify("Erreur lors de la récupération des données de la structure !", "error");
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch structure error:", err);
    notify("Une erreur est survenue lors de la récupération des données de la structure. Veuillez réessayer plus tard.", "error");
    throw err;
  }
};

export default homeStructureLoader;
