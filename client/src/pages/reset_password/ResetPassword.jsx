import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import notify from "../../utils/notify";
import Patoune from "../../assets/logo/1patounes.png";
import "./ResetPassword.css";
import NaveMenu from "../../components/nav_menu/NavMenu";

function ResetPassword() {
  const URL = import.meta.env.VITE_API_URL;
  const [passwordForm, setPasswordForm] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:;ù#àâäéèêëîïôöùûüÿç])[A-Za-z\d@$!%*?&:;ù#àâäéèêëîïôöùûüÿç]{12,}$/;

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const { password } = Object.fromEntries(formData.entries());

      const response = await fetch(`${URL}reset/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.status === 201) {
        notify("Votre mot de passe a bien été modifié", "success");
        navigate("/");
      }
    } catch (error) {
      notify(
        "Une erreur est survenue lors du changement de mot de passe.",
        "error"
      );
    }
  };

  return (
    <div>
      <NaveMenu />

      <section id="headerResetPasswordPage">
        <img src={Patoune} alt="orange paw" id="imgPatoune" />
        <h1>Réinitialisation du mot de passe </h1>
      </section>

      <section id="resetPasswordSection">
        <form method="post" id="resetPassword" onSubmit={handleSubmit}>
            <label htmlFor="password">
              Mot de passe <span className="isRequired">**</span>
            </label>
            <input
              className="resetPasswordInput"
              type="password"
              name="password"
              value={passwordForm}
              minLength={12}
              pattern={passwordRegex.source}
              onChange={(event) => handleInputChange(event, setPasswordForm)}
              required
            />

          <section className="passwordSmall">
            {passwordRegex.test(passwordForm) !== true && (
              <small>
                ** Le mot de passe doit comprendre une majuscule, une minuscule,
                un chiffre et un caractère spécial.
              </small>
            )}
          </section>

            <label htmlFor="passwordConf">
              Confirmer le mot de passe
              <span className="isRequired"> *</span>
            </label>
            <input
              className="resetPasswordInput"
              type="password"
              name="passwordConf"
              minLength={12}
              pattern={passwordRegex.source}
              value={passwordConf}
              onChange={(event) => handleInputChange(event, setPasswordConf)}
              required
            />

          <section className="passwordSmall">
            {passwordForm !== passwordConf && (
              <small>Les mots de passe ne sont pas identiques</small>
            )}
          </section>

          <button
            type="submit"
            id="resetPasswordButton"
            className="buttonType1"
          >
            Envoyer
          </button>
        </form>
      </section>
    </div>
  );
}

export default ResetPassword;
