import PropTypes from "prop-types";
// import { useEffect, useState } from "react";
import LogoCicorne from "../../../assets/logo/cicorne.png";
import styles from "./ProfileHeader.module.css";
import DeleteProfile from "./delete_profile/DeleteProfile";

function ProfileHeader({
  username,
  isEditMode,
  handleEditClick,
  valueName,
  setCustomer,
  avatar,
  setChangeAvatar,
  changeAvatar,
}) {
  const URL = import.meta.env.VITE_API_URL;
  const onChange = (e, champ) => {
    setCustomer((user) => ({ ...user, [champ]: e.target.value }));
  };

  const changeProfilePicture = () => {
    setChangeAvatar(!changeAvatar);
  };

  return (
    <header className={styles.profilePageHeader}>
      <div className={styles.avatarContainer}>
        <img
          className={styles.profilePageImg}
          src={avatar !== null ? `${URL}/${avatar}` : LogoCicorne}
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
                isEditMode === true ? (e) => onChange(e, valueName) : undefined
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
            onClick={changeProfilePicture}
          >
            Changer d'image
          </button>
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
  avatar: PropTypes.string.isRequired,
};

ProfileHeader.defaultProps = {
  isEditMode: false,
  handleEditClick: undefined,
};

export default ProfileHeader;
