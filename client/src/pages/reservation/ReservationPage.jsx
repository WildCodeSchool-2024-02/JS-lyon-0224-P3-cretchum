import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import NavMenu from "../../components/nav_menu/NavMenu";
import styles from "./ReservationPage.module.css";

function ReservationPage() {
  const reservations = useLoaderData();
  const statusMap = {
    waiting: "En attente",
    confirm: "Confirmé",
    refuse: "Refusé",
  };
  const URL = import.meta.env.VITE_API_URL;

  // Fetch received Reservation
  const [received, setReceived] = useState([]);
  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`${URL}reservation/received`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setReceived(data);
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };
    fetchReservation();
  }, [URL]);
  return (
    <>
      <NavMenu />
      <div id={styles.reservationContainer}>
        <section className={styles.reservation}>
          <header className={styles.reservationHeader}>
            <h1 id={styles.reservationTitle}>Mes reservation</h1>
          </header>
          <div className={styles.reservationContent}>
            <h2 className={styles.tableTitle}>Vos annimaux</h2>
            <table id={styles.animalTable}>
              <thead>
                <tr className={styles.columnName}>
                  <th scope="col">reservation n°</th>
                  <th scope="col">Pour</th>
                  <th scope="col">Du</th>
                  <th scope="col">Au</th>
                  <th scope="col">Jours</th>
                  <th scope="col">Hôte</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr
                    className={
                      index % 2 === 0 ? `${styles.rowPair}` : `${styles.rowOdd}`
                    }
                    key={reservation.id}
                  >
                    <th scope="row">{reservation.id}</th>
                    <td>{reservation.name}</td>
                    <td>{reservation.beginning}</td>
                    <td>{reservation.end}</td>
                    <td>{reservation.day}</td>
                    <td>{reservation.username}</td>
                    <td>{reservation.priceday * reservation.day} €</td>
                    <td>{statusMap[reservation.status] || ""}</td>
                    <td>
                      <button type="button">Annuler</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h2 className={styles.tableTitle}>Vous Gardez</h2>
            <table id={styles.animalTable}>
              <thead>
                <tr className={styles.columnName}>
                  <th scope="col">reservation n°</th>
                  <th scope="col">Propriétaire</th>
                  <th scope="col">Pour</th>
                  <th scope="col">Du</th>
                  <th scope="col">Au</th>
                  <th scope="col">Jours</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {received.map((reservation, index) => (
                  <tr
                    className={
                      index % 2 === 0 ? `${styles.rowPair}` : `${styles.rowOdd}`
                    }
                    key={reservation.id}
                  >
                    <th scope="row">{reservation.id}</th>
                    <td>{reservation.username}</td>
                    <td>{reservation.name}</td>
                    <td>{reservation.beginning}</td>
                    <td>{reservation.end}</td>
                    <td>{reservation.day}</td>
                    <td>{reservation.priceday * reservation.day} €</td>
                    <td>{statusMap[reservation.status] || ""}</td>
                    <td>
                      <button type="button">Annuler</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export default ReservationPage;
