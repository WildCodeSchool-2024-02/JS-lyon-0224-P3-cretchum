import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./AnimalDetail.module.css";
import HeaderReservation from "../header";

function AnimalDetails({ name, username, animalId }) {
  const [details, setDetails] = useState(false);
  const handleClick = () => {
    setDetails(!details);
  };
  const [animal, setAnimal] = useState();

  // Fetch animal informations
  const URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`${URL}animal/animalid/${animalId}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setAnimal(data);
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };
    fetchReservation();
  }, [URL, animalId]);
  return (
    <>
      <button
        className={styles.animalDetailsButton}
        onClick={handleClick}
        aria-label={`More details about ${name}`}
        type="button"
      >
        {name}
      </button>
      {details === true && (
        <div className={styles.animalPopup}>
          <div className={styles.animalDetailsContainer}>
            <HeaderReservation
              additionalStyle={styles.header}
              title={`Fiche de ${name}`}
            />

            <table className={styles.animalTable}>
              <th className={styles.col} scope="col">
                Propriétaire
              </th>
              <th className={styles.col} scope="col">
                Age
              </th>
              <th className={styles.col} scope="col">
                Stérilisé
              </th>
              <th className={styles.col} scope="col">
                Espèce
              </th>
              <th className={styles.col} scope="col">
                Race
              </th>
              <th className={styles.col} scope="col">
                Tatoué
              </th>

              <td className={styles.row}>{username}</td>
              <td className={styles.row}>{animal.age}</td>
              <td className={styles.row}>
                {animal.is_sterilized === 1 ? "Oui" : "Non"}
              </td>
              <td className={styles.row}>{animal.species}</td>
              <td className={styles.row}>{animal.breed}</td>
              <td className={styles.row}>
                {animal.is_tattooed_chipped === 1 ? "Oui" : "Non"}
              </td>
            </table>
            <button
              className={styles.closeButton}
              onClick={handleClick}
              type="button"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
AnimalDetails.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  animalId: PropTypes.number.isRequired,
};

export default AnimalDetails;
