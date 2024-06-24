import { useState } from "react";
import { Form } from "react-router-dom";
import styles from "../signin/SignIn.module.css";
import AnimalsFormComponent from "../../components/animals_form_components/AnimalsFormComponents";

function AnimalsForm() {
  const [animalNumber, SetAnimalsNumber] = useState(1);

  const handleInputChange = (e) => {
    SetAnimalsNumber(e.target.value);
  };

  const renderAnimals = () =>
    Array.from({ length: animalNumber }, (index) => (
      <>
       <hr id={styles.line}/>
        <AnimalsFormComponent key={index} />
        {/* {animalNumber > 1 && <hr id={styles.line}/>} */}
      </>
    ));

  return (
    <div id={styles.formContainerAnimal}>
      <Form method="post" id={styles.signInAnimal}>
        <div className={`${styles.inputContainer}`}>
          <label className={styles.formLabel} htmlFor="number of animals">
            Nombre d'animaux que vous souhaitez inscrire
            <span className={styles.isRequired}> *</span>
          </label>
          <select
            className={styles.inputSizeM}
            name="NombreAn"
            onChange={handleInputChange}
            required
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>

        {renderAnimals()}

        <div className={styles.buttonContainer}>
          <button className={styles.accountButton} type="submit">
            Ajouter un animal
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AnimalsForm;
