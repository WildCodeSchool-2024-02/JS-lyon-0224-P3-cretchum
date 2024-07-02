import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import styles from "../sign_up/SignUp.module.css";
import AnimalsFormComponent from "../../components/animals_form_components/AnimalsFormComponents";

function AnimalsForm() {
  const [animalNumber, SetAnimalsNumber] = useState(1);
  const [renderAnimals, SetRenderAnimals] = useState([]);
  const numberAnimal = [1, 2, 3, 4, 5];

  const handleInputChange = (e) => {
    SetAnimalsNumber(e.target.value);
  };

  useEffect(() => {
    const animalArray = [];
    for (let i = 0; i < animalNumber; i += 1) {
      animalArray.push(<hr id={styles.line} />, <AnimalsFormComponent key={i} />);
    }
    SetRenderAnimals(animalArray);
  }, [animalNumber]);

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
             {numberAnimal.map((number) => (
            <option key={number} value={number}>{number}</option>
          ))}
          </select>
        </div>

        {renderAnimals}

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
