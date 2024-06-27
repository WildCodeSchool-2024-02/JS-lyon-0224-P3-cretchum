import { NavLink, useNavigate } from "react-router-dom";
import "./NavMenu.css";
import notify from "../../utils/notify";

function NavMenu() {
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
          <NavLink id="searchPage" to="/page-recherche">
            Page de recherche
          </NavLink>
        </div>
        <div className="navMenu-item">
          <NavLink to="/connexion">Connexion</NavLink>
        </div>
        <button
          className="navMenu-item disconnect"
          type="button"
          onClick={disconnect}
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}

export default NavMenu;
