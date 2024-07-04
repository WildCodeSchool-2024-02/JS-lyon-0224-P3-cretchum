import { useState, useEffect } from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
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
  const { id } = useParams();
  const [animalData, setAnimalData] = useState([]);
  const [changeAvatar, setChangeAvatar] = useState(false);

  const handleSave = () => {
    notify("Informations mises à jour avec succès !", "success");
  };
  const URL = import.meta.env.VITE_API_URL;

  // Update profile informations in BDD
  const handleEditClick = async () => {
    if (isEditMode === true && beforeChange !== customer) {
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
          setIsEditMode(!isEditMode);
          return handleSave();
        }
        if (response.status !== 201) {
          const data = await response.json();
          notify(data.validationErrors[0].message, "error");
        }
        throw new Error("Registration error");
      } catch (err) {
        console.error("Fetch error:", err);
        notify("Erreur lors de la modification du profil", "error");
        return {
          error:
            "An error occurred during registration. Please try again later.",
        };
      }
    }
    return setIsEditMode(!isEditMode);
  };

  const handleDeleteAnimals = async (animalId, animalName) => {
    try {
      const response = await fetch(`${URL}/animal/${animalId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animalId }),
      });

      if (response.status !== 204) {
        throw new Error("an error occured, try againt later");
      }

      notify(`${animalName} a bien été supprimé`, "success");
      return { success: true };
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
  }, [URL, id, animalData]);

  // Profile picture update
  const imageHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
      const response = await fetch(`${URL}/image/${customer.id}`, {
        method: "PUT",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement de l'image");
      }

      if (response.status === 204) {
        // setCustomer({... , avatar: "test"} )
        notify("Image téléchargée avec succès", "success");
        setChangeAvatar(!changeAvatar);
        setTimeout(() => {
          window.location.reload();
        }, "2000");
      }
      if (response.status !== 204) {
        const data = await response.json();
        notify(data.validationErrors[0].message, "error");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <>
      <NavMenu />
      <div className={styles.profilePageContainer}>
        {changeAvatar === true ? (
          <form
            onSubmit={imageHandler}
            encType="multipart/form-data"
            method="post"
          >
            <input type="file" name="avatar" />
            <button type="submit">Télécharger</button>
          </form>
        ) : (
          ""
        )}
        <ProfileHeader
          username={customer.username}
          isEditMode={isEditMode}
          handleEditClick={handleEditClick}
          valueName="username"
          setCustomer={setCustomer}
          avatar={customer.avatar}
          changeAvatar={changeAvatar}
          setChangeAvatar={setChangeAvatar}
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

        <ProfileSection title="Mes animaux">
          {animalData.length > 0 && (
            <ul>
              {animalData.map((animal) => (
                <li className={styles.profilAnimalsList} key={animal.id}>
                  {animal.name}{" "}
                  <button
                    type="submit"
                    onClick={() => handleDeleteAnimals(animal.id, animal.name)}
                    className={styles.deleteAnimalsButton}
                  >
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Link to={`/formulaire-animal/${id}`} className={styles.addLink}>
            Ajouter des animaux
          </Link>
        </ProfileSection>
      </div>
    </>
  );
}

export default ProfilePage;
