import { useState } from "react";
import "./Filter.css";
import Patoune from "../../assets/logo/1patounes.png";

function Filter() {
  // Define state for filter criteria
  const [filters, setFilters] = useState({
    nom: '',
    codePostal: '',
    type: '',
    structure: '',
    prix: '',
  });

  // Handle changes to filter input fields
  const handleChange = (e) => {
     // Update the state with the new filter value
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the search action
  const handleSearch = async () => {
    // Convert filter object to query string parameters
    const queryParams = new URLSearchParams(filters).toString();
    try {
      // Make the API call with the query parameters
      const response = await fetch(
        `http://localhost:3310/api/homestructure?${queryParams}`
      );
      // Check if the response is not okay, throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Parse the response data as JSON
      const data = await response.json();
      // Return the data (you may handle it differently in your app)
      return data;
    } catch (err) {
      // Log the error to the console
      console.error('Fetch error:', err);

      // Return null in case of an error
      return null;
    }
  };

  return (
    <div id="filterDiv">
      <div id="imgSearch">
        <img src={Patoune} alt="orange paw" id="filterPaw" />
        <input
          type="text"
          className="filterInput"
          id="searchInput"
          name="nom"
          value={filters.nom}
          onChange={handleChange}
          maxLength={255}
          placeholder="Rechercher par nom"
        />
      </div>
      <div id="filterConditions">
        <ul id="filterList">
          <li className="filter">
            <input
              type="number"
              className="filterInput"
              name="codePostal"
              value={filters.codePostal}
              onChange={handleChange}
              placeholder="Code postal"
              maxLength={55}
            />
          </li>
          <li className="filter">
            <select className="filterInput" name="type" value={filters.type} onChange={handleChange}>
              <option value="" disabled>
                Animal
              </option>
              <option value="tous">Tous</option>
              <option value="chat">Chat</option>
              <option value="chien">Chien</option>
            </select>
          </li>
          <li className="filter">
            <select className="filterInput" name="structure" value={filters.structure} onChange={handleChange}>
              <option value="" disabled>
                Type de structure
              </option>
              <option value="tous">Tous</option>
              <option value="particulier">Particulier</option>
              <option value="professionnel">Professionnel</option>
            </select>
          </li>
          <li className="filter">
            <select className="filterInput" name="prix" value={filters.prix} onChange={handleChange}>
              <option value="" disabled>
                Prix
              </option>
              <option value="tous">Tous les prix</option>
              <option value="fourchette1">entre 10 et 20 €</option>
              <option value="fourchette2">entre 20 et 30 €</option>
            </select>
          </li>
        </ul>
      </div>
      <button type="button" onClick={handleSearch} className="buttonRechercher">Rechercher</button>
    </div>
  );
}

export default Filter;
