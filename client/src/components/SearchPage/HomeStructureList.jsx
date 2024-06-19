import PropTypes from "prop-types";
import "./HomeStructureList.css";
import PersonImage from "../../assets/images/person.jpg";
import UserAnimal from "./UserAnimal";
import IsProfessionnal from "./isProfessional";

function HomeStructureList({ structure }) {
  return (
    <div id="userCard">
      <div id="userGeneral">
        <div id="userImg">
          <img id="userPicture" src={PersonImage} alt={structure.name} />
        </div>
        <div id="userInfo">
          <h3 id="userName">{structure.name}</h3>
          <p id="userLocation">
            {structure.postal_code} {structure.location}
          </p>
          <IsProfessionnal professional={structure.is_professional} />
        </div>
      </div>

      <ul id="userPref">
        <UserAnimal dog={structure.dog} cat={structure.cat} />
        <li>
          <p id="userPrice">{structure.price} € </p>
        </li>
      </ul>
    </div>
  );
}

export default HomeStructureList;

HomeStructureList.propTypes = {
  structure: PropTypes.shape({
    name: PropTypes.string.isRequired,
    postal_code: PropTypes.number.isRequired,
    is_professional: PropTypes.number.isRequired,
    cat: PropTypes.number.isRequired,
    dog: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};
