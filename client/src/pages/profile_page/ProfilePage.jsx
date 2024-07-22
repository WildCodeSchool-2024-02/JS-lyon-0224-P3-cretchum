import { useState, useEffect, useContext, useReducer } from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
import { toast } from 'react-toastify';

import styles from "./ProfilePage.module.css";
import ProfileHeader from "../../components/profile/profile_header/ProfileHeader";
import ProfileSection from "../../components/profile/profile_section/ProfileSection";
import EditableField from "../../components/profile/editable_field/EditableField";
import EditableTextarea from "../../components/profile/editable_text_area/EditableTextarea";
import EditableDropDown from "../../components/profile/editable_dropdown/EditableDropDown";
import { AuthentificationContext } from "../../use_context/authentification";
import DeleteProfile from "../../components/profile/profile_header/delete_profile/DeleteProfile";

function ProfilePage() {
  const customerdata = useLoaderData();
  const { id } = useParams();
  const { auth, update, setUpdate } = useContext(AuthentificationContext);
  const [animalData, setAnimalData] = useState([]);
  const [updateAnimals, setUpdateAnimals] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);

  // notify the user that their information have been fetch correctly
  const handleSave = () => {
    toast.success("Informations mises à jour avec succès !");
  };
  const URL = import.meta.env.VITE_API_URL;

  // Create initial State for the useReducer hook
  const initialState = {
    customer: { ...customerdata },
    beforeChange: { ...customerdata },
    isEditMode: false,
  };

  // Create the different actions that will be used in UseReducer
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_CUSTOMER":
        return { ...state, customer: action.payload };
      case "SET_BEFORE_CHANGE":
        return { ...state, beforeChange: action.payload };
      case "TOGGLE_EDIT_MODE":
        return { ...state, isEditMode: !state.isEditMode };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // update customer info according to what they write
  const onChange = (e, champ) => {
    dispatch({
      type: "SET_CUSTOMER",
      payload: { ...state.customer, [champ]: e.target.value },
    });
  };

  // Send the users updates
  const handleEditClick = async () => {
    try {
      if (state.isEditMode === true && state.beforeChange !== state.customer) {
        // Determine the endpoint based on user type
        const accessPoint =
          auth.user.isHomeStructure === false ? "user/" : "homestructure/";

        // Prepare the values to be sent based on user type
        const values =
          auth.user.isHomeStructure === false
            ? {
                id: state.customer.id,
                avatar: state.customer.avatar,
                lastname: state.customer.lastname,
                firstname: state.customer.firstname,
                username: state.customer.username,
                phoneNumber: state.customer.phoneNumber,
                location: state.customer.location,
                mail: state.customer.mail,
                description: state.customer.description,
              }
            : state.customer;

        // Send the PUT request to update the customer information
        const response = await fetch(
          `${URL}${accessPoint}${state.customer.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            credentials: "include",
          }
        );

        if (response.status !== 204) {
          const data = await response.json();
          return toast.error(data.validationErrors[0].message);
        }
        dispatch({ type: "SET_BEFORE_CHANGE", payload: state.customer });
        dispatch({ type: "TOGGLE_EDIT_MODE" });
        handleSave();
        return setChangeAvatar(!changeAvatar);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Erreur lors de la modification du profil");
      return {
        error: "An error occurred during registration. Please try again later.",
      };
    }
    setChangeAvatar(!changeAvatar);
    return dispatch({ type: "TOGGLE_EDIT_MODE" });
  };

  // Check if the user has an animal, if they do, fetch it
  useEffect(() => {
    const fetchAnimals = async () => {
      if (auth !== null && auth !== false && auth.user.hasAnimals === true) {
        try {
          const response = await fetch(`${URL}animal/${id}`);
          const data = await response.json();
          setAnimalData(data);
        } catch (err) {
          console.error("Fetch profile error:", err);
        }
      }
    };
    fetchAnimals();
  }, [URL, id, auth, updateAnimals]);

  // function to delete user's animals
  const handleDeleteAnimals = async (animalId, animalName) => {
    try {
      const response = await fetch(`${URL}animal/${animalId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // if something went wrong, notify user
      if (response.status !== 204) {
        throw new Error("an error occured, try againt later");
      }

      /* else reload useEffect so that the user have the latest info
      and notify them that everything went well */
      setUpdateAnimals(!updateAnimals);

      toast.success(`${animalName} a bien été supprimé`);
      return { success: true };
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(
        "Erreur lors de la suppression du profil. Veuillez réessayer plus tard.",
        "error"
      );
      return {
        error: "An error occurred during deletion. Please try again later.",
      };
    }
  };

  // Delete structure info
  const handleDeleteStructure = async () => {
    try {
      const response = await fetch(`${URL}homestructure/${customerdata.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: customerdata.id }),
        credentials: "include",
      });

      // if something went wrong, notify user
      if (response.status !== 204) {
        throw new Error("an error occured, try againt later");
      }

      setUpdate(!update);
      toast.success(
        `les informations de votre structure ont bien été supprimées`
      );
      return { success: true };
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error(
        "Erreur lors de la suppression du profil. Veuillez réessayer plus tard."
      );
      return {
        error: "An error occurred during deletion. Please try again later.",
      };
    }
  };

  return (
    <div className={styles.profilePageContainer}>
      <ProfileHeader
        username={state.customer.username}
        isEditMode={state.isEditMode}
        handleEditClick={handleEditClick}
        valueName="username"
        onChange={onChange}
        customer={state.customer}
        changeAvatar={changeAvatar}
        setChangeAvatar={setChangeAvatar}
      />
      <ProfileSection title="Informations générales">
        <EditableField
          label="Nom"
          value={state.customer.lastname}
          isEditMode={state.isEditMode}
          valueName="lastname"
          onChange={onChange}
        />
        <EditableField
          label="Prénom"
          value={state.customer.firstname}
          isEditMode={state.isEditMode}
          valueName="firstname"
          onChange={onChange}
        />
        <EditableField
          label="Localisation"
          value={state.customer.location}
          isEditMode={state.isEditMode}
          valueName="location"
          onChange={onChange}
        />
        <address className={styles.profileAddressContainer}>
          <EditableField
            label="Téléphone"
            value={state.customer.phoneNumber}
            isEditMode={state.isEditMode}
            valueName="phoneNumber"
            onChange={onChange}
          />
          <EditableField
            label="Email"
            value={state.customer.mail}
            isEditMode={state.isEditMode}
            valueName="mail"
            onChange={onChange}
          />
        </address>
      </ProfileSection>
      <ProfileSection title="Description">
        <EditableTextarea
          value={state.customer.description}
          isEditMode={state.isEditMode}
          valueName="description"
          onChange={onChange}
        />
      </ProfileSection>

      <ProfileSection title="Mes animaux">
        {animalData.length > 0 && (
          <ul>
            {animalData.map((animal) => (
              <li className={styles.profilAnimalsList} key={animal.id}>
                {animal.name}
                <DeleteProfile
                  text={`Êtes-vous sûr de vouloir effectuer cette action ? La suppression de ${animal.name} entraînera également la suppression des réservations associées.`}
                  deleteOnClick={() =>
                    handleDeleteAnimals(animal.id, animal.name)
                  }
                />
              </li>
            ))}
          </ul>
        )}

        <Link to={`/formulaire-animal/${id}`} className={styles.addLink}>
          Ajouter des animaux
        </Link>
      </ProfileSection>

      <ProfileSection title="Ma structure">
        {auth !== null &&
        auth !== false &&
        auth.user.isHomeStructure === true ? (
          <>
            <EditableField
              label="Code postale"
              value={state.customer.postalCode}
              isEditMode={state.isEditMode}
              valueName="postalCode"
              onChange={onChange}
            />
            <EditableDropDown
              label="Chats acceptés"
              value={parseInt(state.customer.cat, 10) ? "Oui" : "Non"}
              isEditMode={state.isEditMode}
              valueName="cat"
              onChange={onChange}
              options={
                parseInt(state.customer.cat, 10) === 1
                  ? [
                      { name: "Oui", value: parseInt(1, 10) },
                      { name: "Non", value: parseInt(0, 10) },
                    ]
                  : [
                      { name: "Non", value: parseInt(0, 10) },
                      { name: "Oui", value: parseInt(1, 10) },
                    ]
              }
            />
            <EditableDropDown
              label="Chiens acceptés"
              value={parseInt(state.customer.dog, 10) === 1 ? "Oui" : "Non"}
              isEditMode={state.isEditMode}
              valueName="dog"
              onChange={onChange}
              options={
                parseInt(state.customer.dog, 10) === 1
                  ? [
                      { name: "Oui", value: parseInt(1, 10) },
                      { name: "Non", value: parseInt(0, 10) },
                    ]
                  : [
                      { name: "Non", value: parseInt(0, 10) },
                      { name: "Oui", value: parseInt(1, 10) },
                    ]
              }
            />
            <EditableDropDown
              label="Type de structure"
              value={
                parseInt(state.customer.isProfessional, 10) === 1
                  ? "Professionnel"
                  : "Particulier"
              }
              isEditMode={state.isEditMode}
              valueName="isProfessional"
              onChange={onChange}
              options={
                parseInt(state.customer.isProfessional, 10) === 1
                  ? [
                      { name: "Professionnel", value: parseInt(1, 10) },
                      { name: "Particulier", value: parseInt(0, 10) },
                    ]
                  : [
                      { name: "Particulier", value: parseInt(0, 10) },
                      { name: "Professionnel", value: parseInt(1, 10) },
                    ]
              }
            />
            <EditableField
              label="Capacité d'accueil"
              value={state.customer.capacity}
              isEditMode={state.isEditMode}
              valueName="capacity"
              onChange={onChange}
            />
            {state.isEditMode === false && (
              <button
                type="submit"
                onClick={handleDeleteStructure}
                className={styles.deleteButton}
                id={styles.deleteHomeStructureButton}
              >
                Je ne souhaite plus être structure d'accueil
              </button>
            )}
          </>
        ) : (
          <Link to={`/inscription_accueil/${id}`} className={styles.addLink}>
            Devenir structure d'accueil
          </Link>
        )}
      </ProfileSection>
    </div>
  );
}

export default ProfilePage;
