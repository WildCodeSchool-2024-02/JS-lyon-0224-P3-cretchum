import { redirect } from "react-router-dom";
import notify from "../../../src/utils/notify";

const structureFormAction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const isProfessional = formData.get("isProfessional");
    const name = formData.get("name");
    const lastname = formData.get("lastname");
    const firstname = formData.get("firstname");
    const phoneNumber = formData.get("phonenumber");
    const postalCode = formData.get("postal_code");
    const location = formData.get("location");
    const mail = formData.get("mail");
    const capacity = formData.get("capacity");
    const price = formData.get("price");
    const cat = formData.get("cat");
    const dog = formData.get("dog");
    const password = formData.get("password");
    const description = formData.get("description");
    const response = await fetch(`http://localhost:3310/api/homestructure`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isProfessional,
        name,
        lastname,
        firstname,
        phoneNumber,
        postalCode,
        location,
        mail,
        capacity,
        price,
        cat,
        dog,
        password,
        description,
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
      error:
        "An error occurred during registration. Please try again later.",
    };
  }
};

export default structureFormAction;
