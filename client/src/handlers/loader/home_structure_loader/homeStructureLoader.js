import { toast } from "react-toastify";

const URL = import.meta.env.VITE_API_URL;

const homeStructureLoader = async ({ params }) => {
  try {
    const response = await fetch(`${URL}homestructure/single/${params.id}`);
    if (response.status !== 200) {
      toast.error(
        "Erreur lors de la récupération des données de la structure !"
      );
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Fetch structure error:", err);
    return toast.error(
      "Une erreur est survenue lors de la récupération des données de la structure. Veuillez réessayer plus tard."
    );
  }
};

export default homeStructureLoader;
