import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../../utils/notify";

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
        notify("Un e-mail de réinitialisation du mot de passe a été envoyé.", "success");
        navigate(`/`);
      } else {
        const errorData = await response.json();
        notify(errorData.message || "Une erreur est survenue. Veuillez réessayer.", "error");
      }
    } catch (err) {
      notify("Une erreur est survenue. Veuillez réessayer.", "error");
    }
  };

  return (
    <div>
      <h2>Réinitialisation du mot de passe</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
