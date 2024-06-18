import PropTypes from "prop-types";
import Pen from "../../assets/images/penblue.png";
import LogoCicorne from "../../assets/logo/cicorne.png";
import styles from "./ProfileHeader.module.css";

function ProfileHeader({ username, isEditMode, handleEditClick }) {
  return (
    <header className={styles.profilePageHeader}>
      <img
        className={styles.profilePageImg}
        src={LogoCicorne}
        alt="Utilisateur"
      />
      <section className={styles.profilePageH1Container}>
        <h1 className={styles.profilePageH1}>
          {isEditMode ? (
            <input
              type="text"
              defaultValue={username}
              className={styles.input}
            />
          ) : (
            username
          )}
        </h1>
      </section>
      <button
        type="button"
        className={styles.editButton}
        onClick={handleEditClick}
      >
        {isEditMode ? "Sauvegarder" : "Modifier"}
        <img
          className={styles.profilePagePen}
          src={Pen}
          alt="Crayon pour la modification des informations du compte"
        />
      </button>
    </header>
  );
}

ProfileHeader.propTypes = {
  username: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  handleEditClick: PropTypes.func.isRequired,
};

export default ProfileHeader;
