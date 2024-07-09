import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import styles from "./StructureForm.module.css";
import notify from "../../utils/notify";
import { AuthentificationContext } from "../../use_context/authentification";

function StructureForm() {
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { update, setUpdate } = useContext(AuthentificationContext);
  const paramsId = useParams();
  const userId = paramsId.id;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const {
        isProfessional,
        postal_code: postalCode,
        capacity,
        price,
        cat,
        dog,
      } = Object.fromEntries(formData.entries());

      const response = await fetch(`${URL}homestructure/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isProfessional,
          postalCode,
          capacity,
          price,
          cat,
          dog,
          userId,
        }),
        credentials: "include",
      });

      const info = await response.json();
      if (response.status === 403) {
        return notify(info.validationErrors[0].message, "error");
      }

      if (response.status === 201) {
        setUpdate(!update);
        notify("Inscription réussie !", "success");
        return navigate("/page-recherche");
      }
      return notify(info.validationErrors[0].message, "error");
    } catch (err) {
      console.error("Fetch error:", err);
      notify(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.",
        "error"
      );
      return {
        error: "An error occurred during registration. Please try again later.",
      };
    }
  };

  return (
    <div id={styles.formContainer}>
      <form method="post" id={styles.signInForm} onSubmit={handleSubmit}>
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
          <button className={styles.accountButton} type="submit">
            Créer mon compte
          </button>
          <p className={styles.compte}>
            Déjà un compte ? <Link to="/connect"> se connecter</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default StructureForm;
