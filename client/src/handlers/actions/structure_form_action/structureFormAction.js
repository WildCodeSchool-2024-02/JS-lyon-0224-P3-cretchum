import { redirect } from "react-router-dom";
import notify from "../../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const structureFormAction = async ({ request, params }) => {
    try {
      const formData = await request.formData();

      const isProfessional = formData.get("isProfessional");
      const postalCode = formData.get("postal_code");
      const capacity = formData.get("capacity");
      const price = formData.get("price");
      const cat = formData.get("cat");
      const dog = formData.get("dog");
      const userId = params.id;
      const response = await fetch(
        `${URL}/homestructure/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            isProfessional,
            postalCode,
            capacity,
            price,
            cat,
            dog,
            userId,
          }),
          credentials: 'include',
        }
      );

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
        error:
          "An error occurred during registration. Please try again later.",
      };
    }
  }

export default structureFormAction;
