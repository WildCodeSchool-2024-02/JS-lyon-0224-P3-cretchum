// import { useLoaderData } from "react-router-dom";
import NavMenu from "../../components/nav_menu/NavMenu";
import styles from "./ReservationPage.module.css";

function ReservationPage() {
  //   const reservations = useLoaderData();
  return (
    <>
      <NavMenu />
      <div id={styles.reservationContainer}>
        <section className={styles.reservation}>
          <header className={styles.reservationHeader}>
            <h2 className={styles.profilePageTitle}>Mes reservation</h2>
          </header>
          <div className={styles.reservationContent}>
            <table>
              <thead>
                <tr>
                  <th scope="col">reservation n°</th>
                  <th scope="col">Pour</th>
                  <th scope="col">Du</th>
                  <th scope="col">Au</th>
                  <th scope="col">Soit</th>
                  <th scope="col">Hôte</th>
                  <th scope="col">Prix</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Chien</td>
                  <td>5/09/24</td>
                  <td>10/09/24</td>
                  <td>5 jours</td>
                  <td>bonheur chien</td>
                  <td>50€</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default ReservationPage;
