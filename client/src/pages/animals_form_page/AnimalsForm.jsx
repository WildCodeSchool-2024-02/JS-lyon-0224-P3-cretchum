import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../sign_up/SignUp.module.css";
import AnimalsFormComponent from "../../components/animals_form_components/AnimalsFormComponents";
import { AuthentificationContext } from "../../use_context/authentification";

function AnimalsForm() {
  const URL = import.meta.env.VITE_API_URL;
  const [animalNumber, SetAnimalsNumber] = useState(1);
  const numberAnimal = [1, 2, 3, 4, 5];
  const paramsId = useParams();
  const navigate = useNavigate();
  const { update, setUpdate } = useContext(AuthentificationContext);

  const handleInputChange = (e) => {
    SetAnimalsNumber(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const number = formData.get("NumberAnimals");
      const names = formData.getAll("name");
      const ages = formData.getAll("age");
      const breed = formData.getAll("breed");
      const species = formData.getAll("species");
      const isSterilized = formData.getAll("isSterilized");
      const isTattooedChipped = formData.getAll("isTattooedChipped");
      const userId = paramsId.id;

      const animals = [];

      for (let i = 0; i < number; i += 1) {
        const animal = {
          name: names[i],
          age: ages[i],
          breed: breed[i],
          specie: species[i],
          isSterilized: isSterilized[i],
          isTattooedChipped: isTattooedChipped[i],
          userId,
        };
        animals.push(animal);
      }
      const response = await fetch(`${URL}/animal/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(animals),
        credentials: "include",
      });

      if (response.status === 403) {
        const data = await response.json();
        return toast.error(data.validationErrors[0].message);
      }
      if (response.status === 201) {
        setUpdate(!update);
        toast.success("Inscription réussie !");
        return navigate("/page-recherche");
      }
      const errorData = await response.json();
      return toast.error(errorData.validationErrors[0].message);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard."
      );
      return {
        error: "An error occurred during registration. Please try again later.",
      };
    }
  };

  const renderAnimals = Array.from({ length: animalNumber }, (_, i) => (
    <AnimalsFormComponent key={i} />
  ));

  return (
    <div id={styles.formContainerAnimal}>
      <form method="post" id={styles.signInAnimal} onSubmit={handleSubmit}>
        <div className={`${styles.inputContainer}`}>
          <label className={styles.formLabel} htmlFor="number of animals">
            Nombre d'animaux que vous souhaitez inscrire
            <span className={styles.isRequired}> *</span>
          </label>
          <select
            className={styles.inputSizeM}
            name="NumberAnimals"
            onChange={handleInputChange}
            required
          >
            {numberAnimal.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </div>

        {renderAnimals}

        <div className={styles.buttonContainer}>
          <button className={styles.accountButton} type="submit">
            Ajouter un animal
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimalsForm;
