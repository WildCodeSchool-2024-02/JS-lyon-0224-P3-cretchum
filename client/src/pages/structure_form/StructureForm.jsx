import { Form, Link } from "react-router-dom";
import styles from "./StructureForm.module.css";

function StructureForm() {

  return (
    <div id={styles.formContainer}>
      <Form method="post" id={styles.signInForm}>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer} id={styles.isProfessional}>
            <label className={styles.formLabel} htmlFor="isProfessional">
              Est professionnel ?<span className={styles.isRequired}> *</span>
            </label>
            <select
              className={styles.inputSizeM}
              name="isProfessional"
              required
            >
              <option value={1}>Oui</option>
              <option value={0}>Non</option>
            </select>
          </div>
        </div>
        <div className={styles.desktopRow}>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="zipcode">
              Code postal :<span className={styles.isRequired}> *</span>
            </label>
            <input
              className={styles.inputSizeM}
              type="text"
              name="postal_code"
              pattern="[0-9]{5}"
              required
            />
          </div>
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
              className={styles.inputSizeS}
              type="number"
              name="price"
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
            <select className={styles.inputSizeM} name="dog" required>
              <option value={1}>Oui</option>
              <option value={0}>Non</option>
            </select>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.formLabel} htmlFor="acceptsCats">
              Chat accepté ?<span className={styles.isRequired}> *</span>
            </label>
            <select className={styles.inputSizeS} name="cat" required>
              <option value={1}>Oui</option>
              <option value={0}>Non</option>
            </select>
          </div>
        </div>
        <div className={styles.containerSmall}>
          <small>* champs requis</small>
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={styles.accountButton}
            type="submit"
          >
            Créer mon compte
          </button>
          <p className={styles.compte}>
            Déjà un compte ? <Link to="/connect"> se connecter</Link>
          </p>
        </div>
      </Form>
    </div>
  );
}

export default StructureForm;
