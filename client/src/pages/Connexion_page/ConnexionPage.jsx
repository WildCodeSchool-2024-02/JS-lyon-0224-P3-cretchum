import { Link, Form } from "react-router-dom";
import Patoune from "../../assets/logo/1patounes.png";
import "./ConnexionPage.css";

function ConnexionPage() {
  const HandleConnexionButton = () => {
    window.location = "/page-recherche";
  };

  return (
    <>
      <section id="headerConnexionPage">
        <img src={Patoune} alt="orange paw" id="connexionPatoune" />
        <h1>Connexion </h1>
      </section>

      <section id="connexionBody">
        <Form method="post" id="connexionPageDiv">
          <label htmlFor="username">Pseudo</label>
          <input
            className="connexionPageInput"
            type="text"
            name="username"
            minLength={3}
            maxLength={20}
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            className="connexionPageInput"
            type="password"
            name="password"
            minLength={2}
            maxLength={255}
            required
          />

          <button
            type="submit"
            onClick={HandleConnexionButton}
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
