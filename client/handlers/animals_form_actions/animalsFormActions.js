import { redirect } from "react-router-dom";
import notify from "../../src/utils/notify";

const URL = import.meta.env.VITE_API_URL;

const animalsFormAction = async ({ request, params }) => {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const age = formData.get("age");
    const breed = formData.get("breed");
    const species = formData.get("species");
    const isSterilized = formData.get("isSterilized");
    const userId = params.id;
    const response = await fetch(`${URL}/animals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        breed,
        species,
        isSterilized,
        userId,
      }),
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
