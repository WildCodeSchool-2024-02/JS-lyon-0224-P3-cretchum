import PropTypes from "prop-types";
import "./HomeStructureList.css";
import CatImage from "../../assets/images/cat.png";
import DogImage from "../../assets/images/dog.png";
import PersonImage from "../../assets/images/person.jpg";
import bToB from "../../assets/function/bToB";

function HomeStructureList({ structure }) {
  const isProfessionnal = bToB(structure.is_professional);
  return (
    <div id="userCard" className="userCard">
      <div id="userGeneral">
        <div id="userImg">
          <img id="userPicture" src={PersonImage} alt={structure.name} />
        </div>
        <div id="userInfo">
          <h3 id="userName">{structure.name}</h3>
          <p id="userLocation">
            {structure.postal_code} {structure.location}
          </p>
          <p
            className="userStructure"
            id={isProfessionnal === false ? "userParticulier" : "userChenil"}
          >
            {isProfessionnal === false ? "particulier" : "professionnel"}
          </p>
        </div>
      </div>

      <ul id="userPref">
        <li
          className={`userAnimal ${structure.cat === 0 ? "animalHidden" : "userCat"}`}
        >
          <img src={CatImage} alt="dessin de chat noir" className="animalImg" />
          <p>Chat</p>
        </li>
        <li
          className={`userAnimal ${structure.dog === 0 ? "animalHidden" : "userDog"}`}
        >
          <img src={DogImage} alt="dessin de chat noir" className="animalImg" />
          <p>Chien</p>
        </li>
        <li className="price">
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
