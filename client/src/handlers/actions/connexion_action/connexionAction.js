import { redirect } from "react-router-dom";
import notify from "../../../utils/notify";

const URL = import.meta.env.VITE_API_URL;

const connexionAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const mail = formData.get("mail");
    const password = formData.get("password");

    const response = await fetch(`${URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mail, password }),
      credentials: 'include',
      
    });

    
    if (response.status === 200) {
      notify("Connexion réussie !", "success");
      return redirect("/page-recherche");
    }
    notify("Email ou mot de passe incorrect !", "error");
    return { error: "incorrect mail or password" };
  } catch (err) {
    notify(
      "Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.",
      "error"
    );
    console.error("Login error:", err);
    return {
      error: "An error occurred during login. Please try again later.",
    };
  }
};

export default connexionAction;
