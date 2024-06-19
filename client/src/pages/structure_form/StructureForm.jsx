import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import notify from "../../utils/notify";
import styles from "./StructureForm.module.css";

function StructureForm() {
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();

  function handleInputChange(event, setState) {
    setState(event.target.value);
  }

  const validateForm = () => {
    // Add your validation logic here
    if (password !== passwordConf) {
      notify("Les mots de passe ne correspondent pas !", "error");
      return false;
    }
    // Add more validation as needed
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm() === true) {
      notify("Compte créé avec succès !", "success");
      // Redirect or perform other actions here
      navigate("/page-recherche");
    }
  };

  return (
    <div id={styles.formContainer}>
      <Form method="post" id={styles.signInForm}>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer} id={styles.isProfessional}>
            <label className={styles.formLabel} htmlFor="isProfessional">
              Vous êtes professionnel ?
              <span className={styles.isRequired}> *</span>
            </label>
            <select
              className={styles.inputSizeM}
              name="isProfessional"
              required
            >
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
          <div className={styles.inputContainer} id={styles.structureName}>
            <label className={styles.formLabel} htmlFor="structureName">
              Nom de la structure / Pseudo :
              <span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="text"
              name="structureName"
              minLength={2}
              maxLength={55}
              required
            />
          </div>
        </div>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer} id={styles.firstInput}>
            <label className={styles.formLabel} htmlFor="lastname">
              Nom :<span className={styles.isRequired}> *</span>
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
              Prénom :<span className={styles.isRequired}> *</span>
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
            <label className={styles.formLabel} htmlFor="phonenumber">
              Téléphone :<span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="tel"
              name="phonenumber"
              pattern="[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="zipcode">
              Code postal :<span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="text"
              name="zipcode"
              pattern="[0-9]{5}"
              required
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="address">
            Adresse :<span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            name="address"
            minLength={3}
            maxLength={255}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="mail">
            E-mail :<span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="email"
            name="mail"
            placeholder="exemple@mail.com"
            minLength={6}
            maxLength={254}
            required
          />
        </div>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="capacity">
              Capacité :<span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="number"
              name="capacity"
              min={1}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="pricePerDay">
              Prix à la journée :<span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="number"
              name="pricePerDay"
              min={0}
              required
            />
          </div>
        </div>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="acceptsDogs">
              Chien accepté ?<span className={styles.isRequired}> *</span>
            </label>
            <select className={styles.inputSizeM} name="acceptsDogs" required>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="acceptsCats">
              Chat accepté ?<span className={styles.isRequired}> *</span>
            </label>
            <select className={styles.inputSizeM} name="acceptsCats" required>
              <option value="yes">Oui</option>
              <option value="no">Non</option>
            </select>
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="password">
            Mot de passe :<span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="password"
            name="password"
            value={password}
            minLength={12}
            maxLength={64}
            onChange={(event) => handleInputChange(event, setPassword)}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="passwordConf">
            Confirmer le mot de passe :
            <span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="password"
            name="passwordConf"
            minLength={12}
            maxLength={64}
            value={passwordConf}
            onChange={(event) => handleInputChange(event, setPasswordConf)}
            required
          />
        </div>
        <div className={`${styles.inputContainer} ${styles.description}`}>
          <label className={styles.formLabel} htmlFor="description">
            Description :
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
          <button
            className={styles.accountButton}
            type="submit"
            onClick={handleSubmit}
          >
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

export default StructureForm;
