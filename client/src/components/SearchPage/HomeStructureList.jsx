import PropTypes from "prop-types";
import "./HomeStructureList.css";
import catImage from "../../assets/images/cat.png";
import dogImage from "../../assets/images/dog.png";

function HomeStructureList({ structure }) {
  return (
    <div id="userCard">
      <div id="userGeneral">
        <div id="userImg">
          <img id="userPicture" src={structure.img} alt={structure.name} />
        </div>
        <div id="userInfo">
          <h3 id="userName">{structure.name}</h3>
          <p id="userLocation">{structure.city}</p>
          <p
            className="userStructure"
            id={
              structure.professionnel === false
                ? "userParticulier"
                : "userChenil"
            }
          >
            {structure.professionnel === false
              ? "particulier"
              : "professionnel"}
          </p>
        </div>
      </div>

      <ul id="userPref">
        <li
          className={`useranimal ${structure.cat === false ? "animalHidden" : "userCat"}`}
        >
          <img src={catImage} alt="dessin de chat noir" className="animalImg" />
          <p>Chat</p>
        </li>
        <li
          className={`useranimal ${structure.dog === false ? "animalHidden" : "userDog"}`}
        >
          <img src={dogImage} alt="dessin de chat noir" className="animalImg" />
          <p>Chien</p>
        </li>
        <li>
          <p id="userprice">{structure.price} € </p>
        </li>
      </ul>
    </div>
  );
}

export default HomeStructureList;

HomeStructureList.propTypes = {
  structure: PropTypes.shape({
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    professionnel: PropTypes.bool.isRequired,
    cat: PropTypes.bool.isRequired,
    dog: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};
