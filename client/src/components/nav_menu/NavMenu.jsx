import "./NavMenu.css";
import { NavLink } from "react-router-dom";

function NavMenu() {
  return (
    <nav className="navMenu">
      <div className="navMenu-container">
        <div className="navMenu-item">
        <NavLink to="/page-recherche"><p>SearchPage</p></NavLink>
        </div>
        <div className="navMenu-item">
        <NavLink to="/connexion"><p>Connexion</p></NavLink>
        </div>
      </div>
    </nav>
  );
}

export default NavMenu;
