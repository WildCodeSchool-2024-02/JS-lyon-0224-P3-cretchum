import styles from "../../pages/signin/SignIn.module.css";

function AnimalsFormComponent() {
  return (
    <>
      <div className={styles.desktopRow}>
        <div className={styles.inputContainer} id={styles.firstInput}>
          <label className={styles.formLabel} htmlFor="name">
            Nom <span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="text"
            name="name"
            minLength={2}
            maxLength={55}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.formLabel} htmlFor="age">
            Age <span className={styles.isRequired}> *</span>
          </label>
          <input
            className={styles.inputSizeM}
            type="number"
            name="age"
            required
          />
        </div>
      </div>

      <div className={styles.desktopRow}>
      <div className={styles.inputContainer}>
        <label className={styles.formLabel} htmlFor="breed">
          Race <span className={styles.isRequired}> *</span>
        </label>
        <input
          className={styles.inputSizeM}
          type="text"
          name="breed"
          minLength={2}
          maxLength={55}
          required
        />
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.formLabel} htmlFor="species">
          Espèce ?<span className={styles.isRequired}> *</span>
        </label>
        <select className={styles.inputSizeM} name="species" required>
          <option value="chat">Chat</option>
          <option value="chien">Chien</option>
        </select>
      </div>
      </div>


      <div className={styles.desktopRow}>
      <div className={styles.inputContainer}>
        <label className={styles.formLabel} htmlFor="isSterilized">
          Est stérilisé(e) ?<span className={styles.isRequired}> *</span>
        </label>
        <select className={styles.inputSizeM} name="isSterilized" required>
          <option value={1}>Oui</option>
          <option value={0}>Non</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <label className={styles.formLabel} htmlFor="isSterilized">
          Est tatoué(e) / pucé(e) ?<span className={styles.isRequired}> *</span>
        </label>
        <select className={styles.inputSizeM} name="isSterilized" required>
          <option value={1}>Oui</option>
          <option value={0}>Non</option>
        </select>
      </div>
      </div>
      <div className={styles.containerSmall}>
        <small>* champs requis</small>

      </div>
    </>
  );
}

export default AnimalsFormComponent;
