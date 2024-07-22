import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CancelButton.module.css";

function CancelButton({ editReservation, id, homeStructureId, username }) {
  const [confirmBox, setConfirmBox] = useState(false);

  return (
    <>
      {confirmBox === true && (
        <div className={styles.confirmPopup}>
          <div className={styles.confirmContainer}>
            <p className={styles.string}>
              Êtes vous sur de vouloir Annuler cette réservation ?
            </p>
            <span className={styles.buttonContainer}>
              <button
                id={styles.confirmCancel}
                className={styles.cancelButton}
                type="button"
                onClick={(event) =>
                  editReservation(
                    event,
                    id,
                    homeStructureId,
                    "cancel",
                    username
                  )
                }
              >
                Oui
              </button>
              <button
                className={styles.abandon}
                type="button"
                onClick={() => setConfirmBox(!confirmBox)}
              >
                Non
              </button>
            </span>
          </div>
        </div>
      )}
      <button
        className={styles.cancelButton}
        type="button"
        onClick={() => setConfirmBox(!confirmBox)}
      >
        Annuler
      </button>
    </>
  );
}

CancelButton.propTypes = {
  id: PropTypes.number.isRequired,
  homeStructureId: PropTypes.number,
  username: PropTypes.string,
  editReservation: PropTypes.func.isRequired,
};

CancelButton.defaultProps = {
  username: undefined,
  homeStructureId: undefined,
};
export default CancelButton;
