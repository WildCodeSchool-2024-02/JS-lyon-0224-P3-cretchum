import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import notify from "../../utils/notify";
import styles from "./ProfilePage.module.css";
import ProfileHeader from "../../components/profile/profile_header/ProfileHeader";
import ProfileSection from "../../components/profile/profile_section/ProfileSection";
import EditableField from "../../components/profile/editable_field/EditableField";
import EditableTextarea from "../../components/profile/editable_text_area/EditableTextarea";
import NavMenu from "../../components/nav_menu/NavMenu";

function ProfilePage() {
  const customer = useLoaderData();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSave = () => {
    notify("Informations mises à jour avec succès !", "success");
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode === true) {
      handleSave();
    }
  };

  return (
    <>
      <NavMenu />
      <div className={styles.profilePageContainer}>
        <ProfileHeader
          username={customer.username}
          isEditMode={isEditMode}
          handleEditClick={handleEditClick}
        />
        <ProfileSection title="Informations générales">
          <EditableField
            label="Nom :"
            value={customer.lastname}
            isEditMode={isEditMode}
            labelClass={styles.label}
          />
          <EditableField
            label="Prénom :"
            value={customer.firstname}
            isEditMode={isEditMode}
            labelClass={styles.label}
          />
          <EditableField
            label="Localisation :"
            value={customer.location}
            isEditMode={isEditMode}
            labelClass={styles.label}
          />
          <address className={styles.profileAddressContainer}>
            <EditableField
              label="Téléphone :"
              value={customer.phone_number}
              isEditMode={isEditMode}
              labelClass={styles.label}
            />
            <EditableField
              label="Email :"
              value={customer.mail}
              isEditMode={isEditMode}
              labelClass={styles.label}
            />
          </address>
        </ProfileSection>
        <ProfileSection title="Description">
          <EditableTextarea
            value={customer.description}
            isEditMode={isEditMode}
          />
        </ProfileSection>
        <ProfileSection title="Vos réservations">
          <ul className={styles.noBullets}>
            <li className={styles.profileLiReservation}>Aucune réservations</li>
          </ul>
        </ProfileSection>
      </div>
    </>
  );
}

export default ProfilePage;
