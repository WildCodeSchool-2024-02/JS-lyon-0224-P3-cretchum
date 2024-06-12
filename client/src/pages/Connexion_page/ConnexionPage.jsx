import Patoune from "../../assets/logo/1patounes.png";
import "./ConnexionPage.css";

function ConnexionPage() {
  const HandleConnexionButton = () => {};

  return (
    <>
      <section id="headerConnexionPage">
        <img src={Patoune} alt="orange paw" id="connexionPatoune" />
        <h1>Connexion </h1>
      </section>

      <section id="connexionBody">
        <div id="ConnexionPageDiv">
          <h3>Nom</h3>
          <input
            className=""
            type="text"
            name="lastname"
            minLength={2}
            maxLength={55}
            required
          />

          <h3>Mot de passe</h3>
          <input
            className=""
            type="text"
            name="lastname"
            minLength={2}
            maxLength={55}
            required
          />

          <button type="submit" onClick={HandleConnexionButton}>
            Connexion
          </button>
          <p>Mot de passe oublié ?</p>
        </div>
      </section>

      <p>Pas encore de compte ? S'inscrire</p>
    </>
  );
}

export default ConnexionPage;
