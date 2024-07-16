import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./ProfileHeader.module.css";
import DeleteProfile from "./delete_profile/DeleteProfile";
import InputFile from "../input_file/InputFile";
import notify from "../../../utils/notify";

function ProfileHeader({
  username,
  isEditMode = false,
  handleEditClick = null,
  valueName = null,
  onChange = null,
  customer,
  setChangeAvatar = null,
  changeAvatar = null,
}) {
  const { avatar } = customer;
  const navigate = useNavigate();
  const { id } = useParams();
  const URL = import.meta.env.VITE_API_URL;

  // Delete profile
  const deleteprofile = async () => {
    try {
      const response = await fetch(`${URL}user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id}),
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
    <header className={styles.profilePageHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.profilePageImg}
            src={avatar}
            alt="Utilisateur"
          />
        </div>
        <section className={styles.profilePageH1Container}>
          <h1 className={styles.profilePageH1}>
            {isEditMode === true ? (
              <input
                type="text"
                defaultValue={username}
                className={styles.input}
                readOnly={isEditMode === false}
                onChange={
                  isEditMode === true ? (e) => onChange(e, valueName) : null
                }
              />
            ) : (
              username
            )}
          </h1>
        </section>
        {handleEditClick !== null && (
          <div className={styles.editProfile}>
            <button
              type="button"
              className={`${styles.editButton} ${isEditMode === true && styles.save}`}
              onClick={handleEditClick}
            >
              {isEditMode === true ? "Sauvegarder" : "Modifier"}
            </button>
            {isEditMode === false && (
              <DeleteProfile
                 text="Êtes vous sur de vouloir supprimer votre compte ?"
                 deleteOnClick={deleteprofile}
               />
            )}
          </div>
        )}
      </div>
      {changeAvatar === true ? (
        <InputFile
          changeAvatar={changeAvatar}
          setChangeAvatar={setChangeAvatar}
          customer={customer}
        />
      ) : (
        ""
      )}
    </header>
  );
}

ProfileHeader.propTypes = {
  username: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool,
  handleEditClick: PropTypes.func,
  onChange: PropTypes.func,
  valueName: PropTypes.string,
  setChangeAvatar: PropTypes.func,
  changeAvatar: PropTypes.bool,
  customer: PropTypes.shape({
    id: PropTypes.number,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    username: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    description: PropTypes.string,
    mail: PropTypes.string,
    phoneNumber: PropTypes.string,
  }).isRequired,
};

ProfileHeader.defaultProps = {
  isEditMode: false,
  handleEditClick: null,
  onChange: null,
  setChangeAvatar: null,
  changeAvatar: null,
  valueName: null,
};

export default ProfileHeader;
