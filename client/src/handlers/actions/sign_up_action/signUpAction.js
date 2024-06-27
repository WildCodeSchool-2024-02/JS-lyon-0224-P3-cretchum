import { redirect } from "react-router-dom";
import notify from "../../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const signUpAction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const lastname = formData.get("lastname");
    const firstname = formData.get("firstname");
    const username = formData.get("username");
    const phoneNumber = formData.get("phone_number");
    const location = formData.get("location");
    const mail = formData.get("mail");
    const password = formData.get("password");
    const description = formData.get("description");

    const buttonValue = formData.get("submitButton");

    const response = await fetch(`${URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lastname,
        firstname,
        username,
        phoneNumber,
        location,
        mail,
        password,
        description,
      }),
      credentials: "include"
    });

    if (response.status === 201) {      
      const newdata = await response.json();
      const userId = newdata.insertId;
      if (buttonValue === "structure") {
        return redirect(`/inscription_accueil/${userId}`);
      }
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
  }};

export default signUpAction;
