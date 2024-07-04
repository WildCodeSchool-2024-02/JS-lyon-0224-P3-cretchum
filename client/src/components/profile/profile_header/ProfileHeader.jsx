import PropTypes from "prop-types";
import LogoCicorne from "../../../assets/logo/cicorne.png";
import styles from "./ProfileHeader.module.css";
import DeleteProfile from "./delete_profile/DeleteProfile";
import InputFile from "../input_file/InputFile";

function ProfileHeader({
  username,
  isEditMode,
  handleEditClick,
  valueName,
  setCustomer,
  customer,
  setChangeAvatar,
  changeAvatar,
}) {
  const onChange = (e, champ) => {
    setCustomer((user) => ({ ...user, [champ]: e.target.value }));
  };
  const { avatar } = customer;

  return (
    <header className={styles.profilePageHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.profilePageImg}
            src={avatar !== null ? `${avatar}` : LogoCicorne}
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
                    : undefined
                }
              />
            ) : (
              username
            )}
          </h1>
        </section>
        {handleEditClick !== undefined && (
          <div className={styles.editProfile}>
            <button
              type="button"
              className={styles.editButton}
              onClick={handleEditClick}
            >
              {isEditMode === true ? "Sauvegarder" : "Modifier"}
            </button>
            <DeleteProfile />
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
  valueName: PropTypes.string.isRequired,
  setCustomer: PropTypes.func.isRequired,
  setChangeAvatar: PropTypes.func.isRequired,
  changeAvatar: PropTypes.bool.isRequired,
  customer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    description: PropTypes.string,
    mail: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};

ProfileHeader.defaultProps = {
  isEditMode: false,
  handleEditClick: undefined,
};

export default ProfileHeader;
