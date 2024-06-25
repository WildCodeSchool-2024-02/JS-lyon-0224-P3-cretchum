const URL = import.meta.env.VITE_API_URL;

const homeStructureLoader = async ({ params }) => {
  const response = await fetch(`${URL}/homestructure/${params.id}`);
  const data = await response.json();
  if (response.status !== 200) {
    throw new Error("erreur lors de la récupération des données");
  }
  return data;
};

export default homeStructureLoader;
