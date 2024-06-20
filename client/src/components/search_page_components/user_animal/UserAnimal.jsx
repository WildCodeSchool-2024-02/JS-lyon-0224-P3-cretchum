import PropTypes from "prop-types";

import CatImage from "../../../assets/images/cat.png";
import DogImage from "../../../assets/images/dog.png";
import "./UserAnimal.css";

function UserAnimal({ dog, cat }) {
  return (
    <>
      <li className={`userAnimal ${cat === 0 ? "animalHidden" : "userCat"}`}>
        <img src={CatImage} alt="dessin de chat noir" className="animalImg" />
        <p>Chat</p>
      </li>
      <li className={`userAnimal ${dog === 0 ? "animalHidden" : "userDog"}`}>
        <img src={DogImage} alt="dessin de chat noir" className="animalImg" />
        <p>Chien</p>
      </li>
    </>
  );
}

export default UserAnimal;

UserAnimal.propTypes = {
  dog: PropTypes.number.isRequired,
  cat: PropTypes.number.isRequired,
};
