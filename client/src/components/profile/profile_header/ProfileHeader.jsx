import PropTypes from "prop-types";
import styles from "./ProfileHeader.module.css";
import DeleteProfile from "./delete_profile/DeleteProfile";
import InputFile from "../input_file/InputFile";

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
                  isEditMode === true
                    ? (e) => onChange(e, valueName)
                    : null
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
              className={styles.editButton}
              onClick={handleEditClick}
            >
              {isEditMode === true ? "Sauvegarder" : "Modifier"}

              </button>
              {isEditMode === false && 
            <DeleteProfile />}
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
  setChangeAvatar : null, 
  changeAvatar : null, 
  valueName : null
};

export default ProfileHeader;
