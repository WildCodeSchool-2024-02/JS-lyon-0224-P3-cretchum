import { useLoaderData } from "react-router-dom";

import ProfileHeader from "../../components/profile/profile_header/ProfileHeader";
import ProfileSection from "../../components/profile/profile_section/ProfileSection";
import Reservation from "../../components/home_structure_details/Reservation";
import UserAnimal from "../../components/search_page_components/user_animal/UserAnimal";
import IsProfessionnal from "../../components/search_page_components/is_professionnal/isProfessional";
import NavMenu from "../../components/nav_menu/NavMenu";
import "./HomeStructureDetails.css";

function HomeStructureDetails() {
  const structures = useLoaderData();

  return (
    <>
      <NavMenu />
      <div id="HomeStructurePage">
        <header id="homeStructureHeader">
          <ProfileHeader
            username={structures.username}
            isEditMode={false}
            handleEditClick={undefined}
            valueName=""
            setCustomer={() => {}}
          />
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
            {structures.description !== "" && (
              <ProfileSection
                title="A propos"
                additionalStyle="HomeStructureDescription"
              >
                <p>{structures.description}</p>
              </ProfileSection>
            )}
          </div>
          <aside className="reservation">
            <Reservation priceday={structures.price} />
          </aside>
        </section>
      </div>
    </>
  );
}

export default HomeStructureDetails;
