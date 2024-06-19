import { Link, Form } from "react-router-dom";
import Patoune from "../../assets/logo/1patounes.png";
import "./ConnexionPage.css";

function ConnexionPage() {
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
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            className="connexionPageInput"
            type="password"
            name="password"
            minLength={12}
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
