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
  const [customer, setCustomer] = useState(useLoaderData());
  const [isEditMode, setIsEditMode] = useState(false);
  const [beforeChange, setBeforeChange] = useState(customer);
  const handleSave = () => {
    notify("Informations mises à jour avec succès !", "success");
  };
  const URL = import.meta.env.VITE_API_URL;
  const handleEditClick = async () => {
    if (isEditMode === true && beforeChange !== customer) {
      setIsEditMode(!isEditMode);
      try {
        const response = await fetch(`${URL}/users/${customer.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customer),
        });

        if (response.status === 204) {
          setBeforeChange(customer);
          return handleSave();
        }
        if (response.status !== 201) {
          const data = await response.json();
          notify(data.validationErrors[0].message, "error");
        }
        throw new Error("Registration error");
      } catch (err) {
        console.error("Fetch error:", err);
        notify(
          "Erreur lors de la modification du profil. Veuillez réessayer plus tard.",
          "error"
        );
        return {
          error:
            "An error occurred during registration. Please try again later.",
        };
      }
    }
    return setIsEditMode(!isEditMode);
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
              value={customer.phoneNumber}
              isEditMode={isEditMode}
              valueName="phoneNumber"
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
          <EditableTextarea
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
