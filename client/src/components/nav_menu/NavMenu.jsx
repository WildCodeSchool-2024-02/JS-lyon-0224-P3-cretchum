import { useContext } from "react";

import "./NavMenu.css";
import { NavLink } from "react-router-dom";
import { AuthentificationContext } from "../../use_context/authentification";

function NavMenu() {
  const { auth } = useContext(AuthentificationContext);

  return (
    <nav className="navMenu">
      <div className="navMenu-container">
        <div className="navMenu-item">
          <NavLink className="linkItem" to="/page-recherche">
            Page de recherche
          </NavLink>
        </div>
        {auth === null || auth === false ? (
          <>
            <div className="navMenu-item">
              <NavLink to="/connexion">Connexion</NavLink>
            </div>
            <div className="navMenu-item">
              <NavLink to="/inscription" >Inscription</NavLink>
            </div>
          </>
        ) : (
          <div className="navMenu-item">
            <NavLink to={`/profil/${auth.user.sub}`} className="linkItem">Profil</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavMenu;
