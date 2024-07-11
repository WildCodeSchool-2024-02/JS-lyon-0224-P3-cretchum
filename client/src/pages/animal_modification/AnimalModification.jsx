import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./AnimalModification.module.css";

function AnimalModification({ isEditMode }) {
  const [animals, setAnimals] = useState([]);
  const [newAnimal, setNewAnimal] = useState({ name: "", species: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editAnimal, setEditAnimal] = useState({ name: "", species: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAnimal = () => {
    setAnimals((prev) => [...prev, newAnimal]);
    setNewAnimal({ name: "", species: "" });
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditAnimal(animals[index]);
  };

  const handleSaveEdit = (index) => {
    const updatedAnimals = animals.map((animal, i) =>
      i === index ? editAnimal : animal
    );
    setAnimals(updatedAnimals);
    setEditIndex(null);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleDeleteAnimal = (index) => {
    setAnimals((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.animalModificationContainer}>
      <ul className={styles.animalList}>
        {animals.map((animal, index) => (
          <li key={index.id} className={styles.animalItem}>
            {editIndex === index && isEditMode ? (
              <div className={styles.editAnimalForm}>
                <input
                  type="text"
                  name="name"
                  value={editAnimal.name}
                  onChange={handleEditInputChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="species"
                  value={editAnimal.species}
                  onChange={handleEditInputChange}
                  className={styles.inputField}
                />
                <button
                  type="submit"
                  onClick={() => handleSaveEdit(index)}
                  className={styles.saveButton}
                >
                  Sauvegarder
                </button>
                <button
                  type="submit"
                  onClick={handleCancelEdit}
                  className={styles.cancelButton}
                >
                  Annuler
                </button>
              </div>
            ) : (
              <div className={styles.animalInfo}>
                <span>
                  {animal.name} - {animal.species}
                </span>
                {isEditMode && (
                  <div>
                    <button
                      type="submit"
                      onClick={() => handleEditClick(index)}
                      className={styles.editButton}
                    >
                      Modifier
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleDeleteAnimal(index)}
                      className={styles.deleteButton}
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      {isEditMode && (
        <div className={styles.newAnimalForm}>
          <input
            type="text"
            name="name"
            placeholder="Nom de l'animal"
            value={newAnimal.name}
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <input
            type="text"
            name="species"
            placeholder="Espèce"
            value={newAnimal.species}
            onChange={handleInputChange}
            className={styles.inputField}
          />
          <button
            type="button"
            onClick={handleAddAnimal}
            className={styles.addButton}
          >
            Ajouter un animal
          </button>
        </div>
      )}
    </div>
  );
}

AnimalModification.propTypes = {
  isEditMode: PropTypes.bool.isRequired,
};

export default AnimalModification;
