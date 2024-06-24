import { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styles from "./ProfilePage.module.css";
import ProfileHeader from "../../components/profile/profile_header/ProfileHeader";
import ProfileSection from "../../components/profile/profile_section/ProfileSection";
import EditableField from "../../components/profile/editable_field/EditableField";
import EditableTextarea from "../../components/profile/editable_text_area/EditableTextarea";
import NavMenu from "../../components/nav_menu/NavMenu";

function ProfilePage() {
  const URL = import.meta.env.VITE_API_URL;
  const customer = useLoaderData();
  const [isEditMode, setIsEditMode] = useState(false);
  const { id } = useParams();
  const [animalData, setAnimalData] = useState([]);

  const handleSave = () => {
    toast.success("Informations mises à jour avec succès !", "success");
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode === true) {
      handleSave();
    }
  };

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await fetch(`${URL}/animal/${id}`);
        const data = await response.json();
        setAnimalData(data);
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };
    fetchAnimals();
  }, [URL, id]);

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

        {animalData.length > 0 && (
          <ProfileSection title="animaux">
            {animalData.map((animal) => (
              <li key={animal.id}>{animal.name} supprimer</li>
            ))}
            <p>Ajouter des animaux</p>
          </ProfileSection>
        )}
                {/* {structureData.length > 0 && ( */}
          <ProfileSection title="Les informations de votre structure">
            <p> Boup</p>
          </ProfileSection>
        {/* )} */}
      </div>
    </>
  );
}

ProfilePage.propTypes = {
  customer: PropTypes.shape({
    username: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    mail: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfilePage;
