import { useState } from "react";
import { Form, Link } from "react-router-dom";
import styles from "./SignUp.module.css";

function SignUp() {
  function handleInputChange(event, setState) {
    setState(event.target.value);
  }
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  return (
    <div id={styles.formContainer}>
      <Form method="post" id={styles.signInForm}>
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
              Pseudo ou nom de votre organisme<span className={styles.isRequired}> *</span>
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
            <label className={styles.formLabel} htmlFor="phonenumber">
              Téléphone <span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="tel"
              name="phone_number"
              pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
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
            value={password}
            minLength={12}
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}" 
            onChange={(event) => handleInputChange(event, setPassword)}
            required
          />
          <section className={styles.passwordSmall}>
            <small>
              ** Le mot de passe doit comprendre une majuscule, une minuscule, un
              chiffre et un caractère spécial.
            </small>
          </section>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="adress">
            Confirmer le mot de passe
            <span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="password"
            name="passwordConf"
            minLength={12}
            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}"
            value={passwordConf}
            onChange={(event) => handleInputChange(event, setPasswordConf)}
            required
          />
          <div className={styles.passwordSmall}>
            {password !== passwordConf && (
              <small>les mots de passes ne sont pas identiques</small>
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
              disabled={password !== passwordConf}
            >
              Je veux faire garder
            </button>
            <button
              className={styles.accountButton}
              type="submit"
              name="submitButton"
              value="structure"
              disabled={password !== passwordConf}
            >
              Je veux accueillir
            </button>
          </div>
          <p className={styles.compte}>
            Déjà un compte ? <Link to="/connexion">se connecter</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default SignUp;
