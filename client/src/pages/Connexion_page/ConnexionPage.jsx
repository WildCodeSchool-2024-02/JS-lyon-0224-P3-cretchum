import { Link, Form } from "react-router-dom";
import { useState } from "react";
import Patoune from "../../assets/logo/1patounes.png";
import "./ConnexionPage.css";

function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  return (
    <>
      <section id="headerConnexionPage">
        <img src={Patoune} alt="orange paw" id="connexionPatoune" />
        <h1>Connexion </h1>
      </section>

      <section id="connexionBody">
        <Form method="post" id="connexionPageDiv">
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
