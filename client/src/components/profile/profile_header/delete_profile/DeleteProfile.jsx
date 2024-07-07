import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./DeleteProfile.module.css";
import notify from "../../../../utils/notify";

function DeleteProfile() {
  const [confirmBox, setConfirmBox] = useState(false);
  const URL = import.meta.env.VITE_API_URL;
  const deletePop = () => {
    setConfirmBox(!confirmBox);
  };
  const urlId = useParams();
  const navigate = useNavigate();
  const deleteprofile = async () => {
    try {
      const response = await fetch(`${URL}/user/${urlId.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(urlId),
      });

      if (response.status === 204) {
        notify("Le profile à été supprimé", "success");
        return navigate("/");
      }
      throw new Error("Registration error");
    } catch (err) {
      console.error("Fetch error:", err);
      notify(
        "Erreur lors de la suppression du profil. Veuillez réessayer plus tard.",
        "error"
      );
      return {
        error: "An error occurred during deletion. Please try again later.",
      };
    }
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
        <p>
          Êtes vous sur de vouloir supprimer votre compte ?
        </p>
        <div className={styles.confirmButton}>
          <button type="button" onClick={deletePop}>
            Annuler
          </button>
          <button
            type="button"
            id={styles.confirmDeleteButton}
            onClick={deleteprofile}
          >
            Confirmer
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteProfile;
