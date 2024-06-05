import "./NavMenu.css";

function NavMenu  () {
  return (
    <nav className="navMenu">
      <div className="navMenu-container">
        <div className="navMenu-item">
          <span>SearchPage</span>
        </div>
        <div className="navMenu-item">
          <span>Connexion</span>
        </div>
      </div>
    </nav>
  );
};

export default NavMenu;
