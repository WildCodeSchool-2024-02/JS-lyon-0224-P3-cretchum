import { redirect } from "react-router-dom";
import notify from "../../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const signUpAction = async ({ request }) => {
  try {
    const formData = await request.formData();

    const {
      lastname,
      firstname,
      username,
      phone_number: phoneNumber,
      location,
      mail,
      password,
      description,
      submitButton: buttonValue,
    } = Object.fromEntries(formData.entries());

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
      notify("Votre compte à bien été créer", "success");
      return redirect(`/formulaire-animal/${userId}`);
    }
    if (response.status !== 201) {
      const data = await response.json();
      notify(data.validationErrors[0].message, "error");
    }
    throw new Error("Registration error");
  } catch (err) {
    notify("Une erreur est survenue lors de l'inscription.", "error");
    return {
      error: "An error occurred during registration.",
    };
  }
};

export default signUpAction;
