import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./SignUp.module.css";
import { AuthentificationContext } from "../../use_context/authentification";

function SignUp() {
  const URL = import.meta.env.VITE_API_URL;
  const [passwordForm, setPasswordForm] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();
  const { update, setUpdate } = useContext(AuthentificationContext);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&:;ù#àâäéèêëîïôöùûüÿç])[A-Za-z\d@$!%*?&:;ù#àâäéèêëîïôöùûüÿç]{12,}$/;

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const {
        lastname,
        firstname,
        username,
        phone_number: phoneNumber,
        location,
        mail,
        password,
        description,
      } = Object.fromEntries(formData.entries());
      const buttonValue = event.nativeEvent.submitter.value;

      const response = await fetch(`${URL}user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lastname,
          firstname,
          username,
          phoneNumber,
          location,
          mail,
          password,
          description,
        }),
        credentials: "include",
      });

      if (response.status === 201) {
        const newData = await response.json();
        const userId = newData.insertId;

        setUpdate(!update);
        if (buttonValue === "structure") {
          toast.success("Votre compte à bien été créé");
          return navigate(`/inscription_accueil/${userId}`);
        }
        toast.success("Votre compte à bien été créé");
        return navigate(`/formulaire-animal/${userId}`);
      }

      const errorData = await response.json();
      return toast.error(errorData.validationErrors[0].message);
    } catch (err) {
      return toast.error("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <div id={styles.formContainer}>
      <form method="post" id={styles.signInForm} onSubmit={handleSubmit}>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer} id={styles.firstInput}>
            <label className={styles.formLabel} htmlFor="lastname">
              Nom <span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="text"
              name="lastname"
              minLength={2}
              maxLength={55}
              required
            />
          </div>
          <div className={styles.inputContainer} id={styles.firstname}>
            <label className={styles.formLabel} htmlFor="firstname">
              Prénom <span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="text"
              name="firstname"
              minLength={2}
              maxLength={55}
              required
            />
          </div>
        </div>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="username">
              Pseudo ou nom de votre organisme
              <span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="text"
              name="username"
              minLength={3}
              maxLength={20}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="phone_number">
              Téléphone <span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="tel"
              name="phone_number"
              placeholder="0612345678"
              required
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="address">
            Ville <span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            name="location"
            minLength={3}
            maxLength={55}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="mail">
            E-mail <span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="email"
            name="mail"
            placeholder="exemple@mail.com"
            minLength={6}
            maxLength={60}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="password">
            Mot de passe <span className={styles.isRequired}>**</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="password"
            name="password"
            value={passwordForm}
            minLength={12}
            pattern={passwordRegex.source}
            onChange={(event) => handleInputChange(event, setPasswordForm)}
            required
          />
          <section className={styles.passwordSmall}>
            {passwordRegex.test(passwordForm) !== true && (
              <small>
                ** Le mot de passe doit faire 12 caractères minimum, comprendre
                une majuscule, une minuscule, un chiffre et un caractère
                spécial.
              </small>
            )}
          </section>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="passwordConf">
            Confirmer le mot de passe
            <span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="password"
            name="passwordConf"
            minLength={12}
            pattern={passwordRegex.source}
            value={passwordConf}
            onChange={(event) => handleInputChange(event, setPasswordConf)}
            required
          />
          <div className={styles.passwordSmall}>
            {passwordForm !== passwordConf && (
              <small>Les mots de passe ne sont pas identiques</small>
            )}
          </div>
        </div>
        <div className={`${styles.inputContainer} ${styles.description}`}>
          <label className={styles.formLabel} htmlFor="Description">
            Description
          </label>
          <textarea
            className={styles.inputDesc}
            type="text"
            name="description"
            maxLength={800}
          />
        </div>
        <div className={styles.containerSmall}>
          <small>* champs requis</small>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonsContainer}>
            <button
              className={styles.accountButton}
              type="submit"
              name="submitButton"
              value="animal"
              disabled={passwordForm !== passwordConf}
            >
              Je veux faire garder
            </button>
            <button
              className={styles.accountButton}
              type="submit"
              name="submitButton"
              value="structure"
              disabled={passwordForm !== passwordConf}
            >
              Je veux accueillir
            </button>
          </div>
          <p className={styles.compte}>
            Déjà un compte ? <Link to="/connexion">se connecter</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
