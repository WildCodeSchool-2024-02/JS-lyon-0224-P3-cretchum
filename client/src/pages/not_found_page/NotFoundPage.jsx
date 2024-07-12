import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import dogFriends from "../../assets/images/dogFriends.png";
import NavMenu from "../../components/nav_menu/NavMenu";

function NotFoundPage() {
  return (
    <>
      <NavMenu />
      <div className={styles.errorPage}>
        <h1>Error 404</h1>
        <h2>La page que vous recherchez n'existe pas.</h2>
        <Link className={`${styles.linkredirection} buttonType1`} to="/">
            Retour à la page d'accueil
        </Link>
        <img src={dogFriends} alt="trois chiens surpris" />
      </div>
    </>
  );
}

export default NotFoundPage;
