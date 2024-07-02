import { Link } from "react-router-dom";
import styles from "../not_found_page/NotFoundPage.module.css";
import catChock from "../../assets/images/catChock.png";
import NavMenu from "../../components/nav_menu/NavMenu";

function NotFoundPage() {
  return (
    <>
      <NavMenu />
      <div className={styles.errorPage}>
        <h1>Accès Refusé </h1>
        <h2>Vous n'avez pas l'autorisation d'accéder à ce contenu.</h2>
        <Link className={styles.navLink} to="/connexion">
          <button className={`${styles.button} buttonType1`} type="button">
            Cliquez ici pour vous connecter
          </button>
        </Link>
        <img src={catChock} alt="trois chats surpris" />
      </div>
    </>
  );
}

export default NotFoundPage;
