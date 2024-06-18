import { Link, Form, useNavigate } from "react-router-dom";
import { useState } from "react";
import Patoune from "../../assets/logo/1patounes.png";
import notify from "../../utils/notify";
import "./ConnexionPage.css";

function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const validateForm = () => {
    if (!email || !password) {
      notify("Tous les champs sont requis !", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
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
            onChange={(event) => handleInputChange(event, setEmail)}
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            className="connexionPageInput"
            type="password"
            name="password"
            minLength={12}
            onChange={(event) => handleInputChange(event, setPassword)}
            required
          />

          <button
            type="submit"
            id="connexionButton"
          >
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
