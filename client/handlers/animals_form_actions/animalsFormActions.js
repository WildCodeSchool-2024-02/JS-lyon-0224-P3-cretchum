import { redirect } from "react-router-dom";
import notify from "../../src/utils/notify";

const URL = import.meta.env.VITE_API_URL;

const animalsFormAction = async ({ request, params }) => {
  try {
    const formData = await request.formData();

    const names = formData.getAll("name");
    const ages = formData.getAll("age");
    const breeds = formData.getAll("breed");
    const species = formData.getAll("species");
    const isSterilized = formData.getAll("isSterilized");
    const isTattooedChipped = formData.getAll("isTattooedChipped");
    const userId = params.id;

    const animals = names.map((_, index) => ({
      name: names[index],
      age: ages[index],
      breed: breeds[index],
      specie: species[index],
      isSterilized: isSterilized[index],
      isTattooedChipped: isTattooedChipped[index],
      userId,
    }));

    const response = await fetch(`${URL}/animal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(animals),
    });

    if (response.status === 201) {
      notify("Inscription réussie !", "success");
      return redirect("/page-recherche");
    }
    notify("Erreur lors de l'inscription !", "error");
    throw new Error("Registration error");
  } catch (err) {
    console.error("Fetch error:", err);
    notify(
      "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.",
      "error"
    );
    return {
      error: "An error occurred during registration. Please try again later.",
    };
  }
};

export default animalsFormAction;
