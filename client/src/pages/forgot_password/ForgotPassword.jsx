import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../../utils/notify";
import "./ForgotPassword.css";

import NavMenu from "../../components/nav_menu/NavMenu";

function ForgotPassword() {
  const URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 250) {
        notify(
          "Un e-mail de réinitialisation du mot de passe a été envoyé.",
          "success"
        );
        navigate(`/`);
      } else {
        const errorData = await response.json();
        notify(
          errorData.message || "Une erreur est survenue. Veuillez réessayer.",
          "error"
        );
      }
    } catch (err) {
      notify("Une erreur est survenue. Veuillez réessayer.", "error");
    }
  };

  return (
    <div>
      <NavMenu />
      <h2>Réinitialisation du mot de passe</h2>
      <form method="post" id="forgotPassword" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Adresse e-mail :</label>
          <input
            className="forgotPasswordInput"
            type="email"
            name="mail"
            id="email"
            minLength={3}
            maxLength={254}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" id="forgotPasswordButton" className="buttonType1">Envoyer</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
