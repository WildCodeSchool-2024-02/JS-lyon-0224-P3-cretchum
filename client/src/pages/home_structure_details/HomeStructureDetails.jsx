import { useLoaderData } from "react-router-dom";
import { useContext } from "react";

import ProfileHeader from "../../components/profile/profile_header/ProfileHeader";
import ProfileSection from "../../components/profile/profile_section/ProfileSection";
import Reservation from "../../components/home_structure_details/Reservation";
import UserAnimal from "../../components/search_page_components/user_animal/UserAnimal";
import IsProfessionnal from "../../components/search_page_components/is_professionnal/IsProfessional";
import "./HomeStructureDetails.css";
import { AuthentificationContext } from "../../use_context/authentification";

function HomeStructureDetails() {
  const structures = useLoaderData();
  const { auth } = useContext(AuthentificationContext);

  return (
    <div id="HomeStructurePage">
      <header id="homeStructureHeader">
        <ProfileHeader username={structures.username} customer={structures} />
      </header>
      <section id="HomeStructureInfo">
        <div id="gobalInfo">
          <ProfileSection
            title="Informations Générales"
            additionalStyle="infoDiv"
          >
            <div className="hsFlexBox">
              <h4 className="hsDetailH4">Adresse</h4>
              <p id="hsLocation">
                {structures.postal_code} - {structures.location}
              </p>
            </div>
            <hr className="hsHrLine" />
            <div className="hsFlexBox">
              <h4 className="hsDetailH4">Animaux acceptés</h4>
              <ul id="hsAnimalId">
                <UserAnimal cat={structures.cat} dog={structures.dog} />
              </ul>
            </div>
            <hr className="hsHrLine" />
            <div className="hsFlexBox">
              <h4 className="hsDetailH4">Type de structure</h4>
              <IsProfessionnal professional={structures.is_professional} />
            </div>
            <hr className="hsHrLine" />
            <div className="hsFlexBox">
              <h4 className="hsDetailH4">Prix à la journée</h4>
              <p id="hsPrice">{structures.price} €</p>
            </div>
          </ProfileSection>
          {structures.description !== null && (
            <ProfileSection
              title="A propos"
              additionalStyle="HomeStructureDescription"
            >
              <p>{structures.description}</p>
            </ProfileSection>
          )}
        </div>
        <aside className="reservation">
          <Reservation
            priceday={structures.price}
            auth={auth}
            structures={structures}
          />
        </aside>
      </section>
    </div>
  );
}

export default HomeStructureDetails;
