import { useState } from "react";
import styles from "./SignIn.module.css";

export default function SingIn() {
  function handleInputChange(event, setState) {
    setState(event.target.value);
  }
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [adress, setAdress] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div id={styles.formContainer}>
      <form id={styles.signInForm}>
        <div className={styles.inputContainer} id={styles.firstInput}>
          <label className={styles.formLabel} htmlFor="firstname">
            Prénom :
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            value={firstname}
            onChange={(event) => handleInputChange(event, setFirstname)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="lastname">
            Nom :
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            value={lastname}
            onChange={(event) => handleInputChange(event, setLastname)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="Pseudo">
            Pseudo :
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            value={pseudo}
            onChange={(event) => handleInputChange(event, setPseudo)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="phonenumber">
            Téléphone :
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            value={phone}
            onChange={(event) => handleInputChange(event, setPhone)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="mail">
            E-mail :
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            value={mail}
            onChange={(event) => handleInputChange(event, setMail)}
            onKeyDown={handleInputKeyDown}
            placeholder="exemple@mail.com"
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="adress">
            Adresse :
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            value={adress}
            onChange={(event) => handleInputChange(event, setAdress)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className={`${styles.inputContainer} ${styles.description}`}>
          <label className={styles.formLabel} htmlFor="Description">
            Description :
          </label>
          <textarea
            className={styles.inputDesc}
            type="text"
            value={desc}
            onChange={(event) => handleInputChange(event, setDesc)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.accountButton} type="button">
            Créer mon compte
          </button>
          <span className={styles.compte}>
            Déjà un compte ?{" "}
            <button className={styles.connectButton} type="button">
              se connecter
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
