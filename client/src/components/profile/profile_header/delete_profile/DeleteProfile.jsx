import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./DeleteProfile.module.css";

function DeleteProfile({ deleteOnClick, text }) {
  const [confirmBox, setConfirmBox] = useState(false);
  const deletePop = () => {
    setConfirmBox(!confirmBox);
  };

  return (
    <>
      <button className={styles.deleteButton} type="button" onClick={deletePop}>
        Supprimer
      </button>
      <div
        className={
          confirmBox === true ? `${styles.confirmBox}` : `${styles.hidden}`
        }
      >
        <p id={styles.deleteParagraph}>{text}</p>
        <div className={styles.confirmButton}>
          <button type="button" onClick={deletePop}>
            Annuler
          </button>
          <button
            type="button"
            id={styles.confirmDeleteButton}
            onClick={deleteOnClick}
          >
            Confirmer
          </button>
        </div>
      </div>
    </>
  );
}

DeleteProfile.propTypes = {
  deleteOnClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default DeleteProfile;
