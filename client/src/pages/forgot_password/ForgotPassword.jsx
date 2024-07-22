import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Patoune from "../../assets/logo/1patounes.png";
import "./ForgotPassword.css";

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
        toast.success(
          "Un e-mail de réinitialisation du mot de passe a été envoyé."
        );
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Une erreur est survenue. Veuillez réessayer."
        );
      }
    } catch (err) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <section id="headerforgotPasswordPage">
        <img src={Patoune} alt="orange paw" id="imgPatoune" />
        <h1>Réinitialisation du mot de passe </h1>
      </section>

      <section id="forgotPasswordSection">
        <form method="post" id="forgotPassword" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            id="forgotPasswordButton"
            className="buttonType1"
          >
            Envoyer
          </button>
        </form>
      </section>
    </div>
  );
}

export default ForgotPassword;
