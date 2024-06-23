import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./ProfilePage.module.css";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileSection from "../../components/profile/ProfileSection";
import EditableField from "../../components/profile/EditableField";
import NavMenu from "../../components/nav_menu/NavMenu";

function ProfilePage() {
  const [customer, setCustomer] = useState(useLoaderData());
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSave = () => {
    toast.success("Informations mises à jour avec succès !", "success");
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
          valueName="username"
          setCustomer={setCustomer}
        />
        <ProfileSection title="Informations générales">
          <EditableField
            label="Nom :"
            value={customer.lastname}
            isEditMode={isEditMode}
            valueName="lastname"
            setCustomer={setCustomer}
          />
          <EditableField
            label="Prénom :"
            value={customer.firstname}
            isEditMode={isEditMode}
            valueName="firstname"
            setCustomer={setCustomer}
          />
          <EditableField
            label="Localisation :"
            value={customer.location}
            isEditMode={isEditMode}
            valueName="location"
            setCustomer={setCustomer}
          />
          <address className={styles.profileAddressContainer}>
            <EditableField
              label="Téléphone :"
              value={customer.phone_number}
              isEditMode={isEditMode}
              valueName="phone_number"
              setCustomer={setCustomer}
            />
            <EditableField
              label="Email :"
              value={customer.mail}
              isEditMode={isEditMode}
              valueName="mail"
              setCustomer={setCustomer}
            />
          </address>
        </ProfileSection>
        <ProfileSection title="Description">
          <EditableField
            label=""
            value={customer.description}
            isEditMode={isEditMode}
            valueName="description"
            setCustomer={setCustomer}
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
