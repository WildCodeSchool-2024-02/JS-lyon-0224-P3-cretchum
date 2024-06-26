import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import styles from "../sign_up/SignUp.module.css";
import AnimalsFormComponent from "../../components/animals_form_components/AnimalsFormComponents";

function AnimalsForm() {
  const [animalNumber, SetAnimalsNumber] = useState(1);
  const [renderAnimals, SetRenderAnimals] = useState([]);

  const handleInputChange = (e) => {
    SetAnimalsNumber(e.target.value);
  };

  useEffect(() => {
    const an = [];
    for (let i = 0; i < animalNumber; i += 1) {
      an.push(<hr id={styles.line} />, <AnimalsFormComponent key={i} />);
    }
    SetRenderAnimals(an);
  }, [animalNumber]);

  // Celui du dessous il vient d'un blog indien que j'ai trouvé, il a l'air plus propre mais peut être plus compliqué à expliquer
  // je vous laisse dessider quel renderAniamls on garde

  // const renderAnimals = () =>
  //   Array.from({ length: animalNumber }, (index) => (
  //     <>
  //      <hr id={styles.line}/>
  //       <AnimalsFormComponent key={index} />
  //     </>
  // ));

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
