import { useContext } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import "./NavMenu.css";
import notify from "../../utils/notify";
import { AuthentificationContext } from "../../use_context/authentification";

function NavMenu() {
  const { auth, update, setUpdate } = useContext(AuthentificationContext);

  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const disconnect = async () => {
    try {
      const response = await fetch(`${URL}/users/logout`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      if (response.status === 200) {
        setUpdate(!update)
        notify("Déconnecté avec succes", "success");
        setTimeout(navigate("/"), 5000);
      }
    } catch (error) {
      notify("Erreur", "error");
    }
  };
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
              <NavLink to="/inscription">Inscription</NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="navMenu-item">
              <NavLink to={`/profil/${auth.user.sub}`} className="linkItem">
                Profil
              </NavLink>
            </div>
            <div className="navMenu-item">
              <button
                className="navMenu-item disconnect"
                type="button"
                onClick={disconnect}
              >
                Déconnexion
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavMenu;
