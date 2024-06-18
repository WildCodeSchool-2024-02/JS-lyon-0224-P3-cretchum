import { useState } from "react";
import PropTypes from "prop-types";
import "./Filter.css";
import Patoune from "../../assets/logo/1patounes.png";

function Filter({
  onFilterChange,
  setSearch,
  setCountPage,
  setPageLim,
  setPageLimSup,
}) {
  const [postalCode, setPostalCode] = useState("");
  const [animal, setAnimal] = useState("tous");
  const [structureType, setStructureType] = useState("tous");
  const [priceRange, setPriceRange] = useState("tous");

  // Handle click event to send filter values to parent component
  const onClick = (e) => {
    e.preventDefault();
    const filters = {
      postalCode,
      animal,
      structureType,
      priceRange,
    };
    onFilterChange(filters);
    setCountPage(1);
    setPageLim(0);
    setPageLimSup(30);
  };

  // Handle Input Key Down if the key Enter it press, it send Input and filter values to parent component
  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      onClick(e);
    }
  };

  const onSearchChange = (e) => {
    onClick(e);
    setSearch(e.target.value);
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
          onChange={(e) => onSearchChange(e)}
          onKeyDown={handleInputKeyDown}
        />
      </div>
      <div id="filterConditions">
        <ul id="filterList">
          <li className="filter">
            <input
              type="number"
              className="filterInput"
              placeholder="Code postal"
              maxLength={11}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </li>
          <li className="filter">
            <select
              className="filterInput pointer"
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
              className="filterInput pointer"
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
              className="filterInput pointer"
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="tous" disabled selected>
                Prix
              </option>
              <option value="tous">Tous les prix</option>
              <option value="fourchette1">de 10 à 20 €</option>
              <option value="fourchette2">de 20 à 30 €</option>
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
  setSearch: PropTypes.func.isRequired,
  setCountPage: PropTypes.func.isRequired,
  setPageLim: PropTypes.func.isRequired,
  setPageLimSup: PropTypes.func.isRequired,
};

export default Filter;
