import "./NavMenu.css";
import { NavLink } from "react-router-dom";

function NavMenu() {
  return (
    <nav className="navMenu">
      <div className="navMenu-container">
        <div className="navMenu-item">
          <NavLink id="searchPage" to="/page-recherche">
            Page de recherche
          </NavLink>
        </div>
        <div className="navMenu-item">
          <NavLink to="/connexion">Connexion</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
