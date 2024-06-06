import "./Filter.css";
import Patoune from "../../assets/logo/1patounes.png";

function Filter() {
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
              type="text"
              className="filterInput "
              placeholder="Lieu"
              maxLength={55}
            />
          </li>
          <li className="filter">
            <select className="filterInput">
              <option value="" disabled selected>
                Animal
              </option>
              <option value="tous">Tous</option>
              <option value="chat">Chat</option>
              <option value="chien">Chien</option>
            </select>
          </li>

          <li className="filter">
            <select className="filterInput">
              <option value="" disabled selected>
                Type de structure
              </option>
              <option value="tous">Tous</option>
              <option value="particulier">Particulier</option>
              <option value="professionnel">Professionnel</option>
            </select>
          </li>

          <li className="filter">
            <select className="filterInput">
              <option value="" disabled selected>
                Prix
              </option>
              <option value="tous">Tous les prix</option>
              <option value="fourchette1">entre 10 et 20 €</option>
              <option value="fourchette2">entre 20 et 30 €</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
