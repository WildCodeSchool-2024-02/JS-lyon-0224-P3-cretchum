import { useState } from "react";
import { Form, Link } from "react-router-dom";
import styles from "./SignIn.module.css";

function SingIn() {
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
              Nom :
            </label>
            <input className={styles.inputSizeM} type="text" name="lastname" />
          </div>
          <div className={styles.inputContainer} id={styles.firstname}>
            <label className={styles.formLabel} htmlFor="firstname">
              Prénom :
            </label>
            <input className={styles.inputSizeM} type="text" name="firstname" />
          </div>
        </div>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="username">
              Pseudo :
            </label>
            <input className={styles.inputSizeM} type="text" name="username" />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="phonenumber">
              Téléphone :
            </label>
            <input
              className={styles.inputSizeM}
              type="text"
              name="phonenumber"
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="address">
            Adresse :
          </label>
          <input className={styles.inputSizeM} type="text" name="address" />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="mail">
            E-mail :
          </label>
          <input className={styles.inputSizeM} type="text" name="mail" />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="password">
            Mot de passe :
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            name="password"
            value={password}
            onChange={(event) => handleInputChange(event, setPassword)}
            placeholder="exemple@mail.com"
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="adress">
            Confirmer le mot de passe :
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            name="passwordConf"
            value={passwordConf}
            onChange={(event) => handleInputChange(event, setPasswordConf)}
          />
        </div>
        <div className={`${styles.inputContainer} ${styles.description}`}>
          <label className={styles.formLabel} htmlFor="Description">
            Description :
          </label>
          <textarea className={styles.inputDesc} type="text" />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.accountButton} type="submit">
            Créer mon compte
          </button>
          <span className={styles.compte}>
            Déjà un compte ? <Link to="/connect">se connecter</Link>
          </span>
        </div>
      </Form>
    </div>
  );
}

export default SingIn;
