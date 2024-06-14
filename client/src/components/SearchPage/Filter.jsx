import { useState } from "react";
import PropTypes from "prop-types";
import "./Filter.css";
import Patoune from "../../assets/logo/1patounes.png";

function Filter({ onFilterChange }) {
  const [postalCode, setPostalCode] = useState("");
  const [animal, setAnimal] = useState("tous");
  const [structureType, setStructureType] = useState("tous");
  const [priceRange, setPriceRange] = useState("tous");

  // Handle click event to send filter values to parent component
  const onClick = () => {
    const filters = {
      postalCode,
      animal,
      structureType,
      priceRange,
    };
    onFilterChange(filters);
  };

  return (
    <div id="filterDiv">
      <div id="imgSearch">
        <img src={Patoune} alt="orange paw" id="filterPaw" />
        <input
          type="text"
          className="filterInput"
          id="seachInput"
          maxLength={255}
          placeholder="Rehercher par nom"
        />
      </div>
      <div id="filterConditions">
        <ul id="filterList">
          <li className="filter">
            <input
              type="number"
              className="filterInput "
              placeholder="Code postal"
              maxLength={11}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </li>
          <li className="filter">
            <select
              className="filterInput"
              onChange={(e) => setAnimal(e.target.value)}
            >
              <option value="tous" disabled selected>
                Animal
              </option>
              <option value="tous">Tous</option>
              <option value="chat">Chat</option>
              <option value="chien">Chien</option>
            </select>
          </li>

          <li className="filter">
            <select
              className="filterInput"
              onChange={(e) => setStructureType(e.target.value)}
            >
              <option value="tous" disabled selected>
                Structures
              </option>
              <option value="tous">Tous</option>
              <option value="particulier">Particulier</option>
              <option value="professionnel">Professionnel</option>
            </select>
          </li>

          <li className="filter">
            <select
              className="filterInput"
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="tous" disabled selected>
                Prix
              </option>
              <option value="tous">Tous les prix</option>
              <option value="fourchette1">entre 10 et 20 €</option>
              <option value="fourchette2">entre 20 et 30 €</option>
            </select>
          </li>
        </ul>
      </div>
      <button type="button" onClick={onClick} className="buttonRechercher">
        Rechercher
      </button>
    </div>
  );
}

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
