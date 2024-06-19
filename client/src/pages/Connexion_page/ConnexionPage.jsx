import { Link, Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import notify from "../../utils/notify";
import Patoune from "../../assets/logo/1patounes.png";
import "./ConnexionPage.css";

function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const validateForm = () => {
    if (!email.trim() === true || !password.trim() === true) {
      notify("Tous les champs sont requis !", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm() === true) {
      notify("Connexion réussie !", "success");
      navigate("/page-recherche");
    }
  };
  return (
    <>
      <section id="headerConnexionPage">
        <img src={Patoune} alt="orange paw" id="connexionPatoune" />
        <h1>Connexion </h1>
      </section>

      <section id="connexionBody">
        <Form method="post" id="connexionPageDiv" onSubmit={handleSubmit}>
          <label htmlFor="mail">Adresse mail</label>
          <input
            className="connexionPageInput"
            type="mail"
            name="mail"
            minLength={3}
            maxLength={254}
            value={email}
            onChange={(event) => handleInputChange(event, setEmail)}
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            className="connexionPageInput"
            type="password"
            name="password"
            minLength={12}
            value={password}
            onChange={(event) => handleInputChange(event, setPassword)}
            required
          />

          <button type="submit" id="connexionButton" className="buttonType1">
            Connexion
          </button>

          <p>Mot de passe oublié ?</p>
        </Form>
      </section>

      <section id="connexionFooter">
        <Link to="/inscription">Pas encore de compte ? S'inscrire</Link>
      </section>
    </>
  );
}

export default ConnexionPage;
