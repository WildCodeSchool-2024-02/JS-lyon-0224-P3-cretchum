import { Link } from 'react-router-dom';
import "./homePage-style.css";

import logoPatounes from "../../assets/logo/1patounes.png";
import logoCicorne from "../../assets/logo/cicorne.png";

function HomePage() {
	return (
    <div className="homePage">
      <header className="homePageHeader">
        <img
          className="homePageLogoCicorne"
          src={logoCicorne}
          alt="Site logo representing a chimera of a stork and a unicorn"
        />
      </header>
      <main className="homePageMain">
        <section className="homePageSectionTitle">
          <img
            className="homePageLogoPatounes"
            src={logoPatounes}
            alt="Visual representing an animal's footprint."
          />
          <h1 className="homePageTitle">Cretchom</h1>
        </section>
        <nav className="homePageNav">
          <ul className="homePageNavList">
            <li className="homePageNavItem">
              <Link className="homePageNavLink" to="/connexion">
                Connexion
              </Link>
            </li>
            <li className="homePageNavItem">
              <Link className="homePageNavLink" to="/inscription">
                Inscription
              </Link>
            </li>
            <li className="homePageNavItem">
              <Link className="homePageNavLink" to="/visiteur">
                Visiteur
              </Link>
            </li>
          </ul>
        </nav>
      </main>
      <footer className="homePageFooter">
        <p>© 2024 Cretchom. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default HomePage;