import { useLoaderData } from "react-router-dom";

import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileSection from "../../components/profile/ProfileSection";
import Reservation from "../../components/home_structure_details/Reservation";
import UserAnimal from "../../components/SearchPage/UserAnimal";
import IsProfessionnal from "../../components/SearchPage/isProfessional";
import "./HomeStructureDetails.css";

function HomeStructureDetails() {
  const structures = useLoaderData();

  return (
    <div id="HomeStructurePage">
      <header id="homeStructureHeader">
        <ProfileHeader username={structures.name} />
      </header>
      <section id="HomeStructureInfo">
        <div id="gobalInfo">
          <ProfileSection title="Informations Générales">
            <div id="infoDiv">
              <h4>Code postale</h4>
              <p>{structures.postal_code}</p>
              <h4>Animaux acceptés</h4>
              <ul>
                <UserAnimal cat={structures.cat} dog={structures.dog} />
              </ul>
              <IsProfessionnal professional={structures.is_professional} />
            </div>
          </ProfileSection>
          {structures.description !== null && (
            <ProfileSection title="A propos">
              <div id="HomeStructureDescription">
                <p>{structures.description}</p>
              </div>
            </ProfileSection>
          )}
        </div>
        <aside className="reservation">
          <Reservation />
        </aside>
      </section>
    </div>
  );
}

export default HomeStructureDetails;
