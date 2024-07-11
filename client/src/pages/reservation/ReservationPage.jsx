import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import notify from "../../utils/notify";
import NavMenu from "../../components/nav_menu/NavMenu";
import styles from "./ReservationPage.module.css";

function ReservationPage() {
  const reservations = useLoaderData();
  const statusMap = {
    waiting: "En attente",
    confirm: "Confirmé",
    cancel: "Annulé",
  };
  const URL = import.meta.env.VITE_API_URL;

  //   const [change, setChange] = useState(false);

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

  // Cancelation button
  const editReservation = async (
    event,
    id,
    homeStructureId,
    type,
    username
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(`${URL}reservation/status?type=${type}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          home_structure_id: homeStructureId,
          username,
        }),
      });
      if (response.status !== 204) {
        notify("Erreur lors de la modification de la réservation", "error");
      } else {
        notify("Réservation modifié", "success");
        setTimeout(() => {
          window.location.reload();
        }, "1000");
      }
    } catch (err) {
      console.error("Fetch error");
    }
  };

  return (
    <>
      <NavMenu />
      <div id={styles.reservationContainer}>
        <section className={styles.reservation}>
          <header className={styles.reservationHeader}>
            <h1 id={styles.reservationTitle}>Mes reservation</h1>
          </header>
          <div className={styles.reservationContent}>
            <h2 className={styles.tableTitle}>Vos animaux</h2>
            <div className={styles.tableContainer}>
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
                        index % 2 === 0
                          ? `${styles.rowPair}`
                          : `${styles.rowOdd}`
                      }
                      key={reservation.id}
                    >
                      <th scope="row">{reservation.id}</th>
                      <td>{reservation.name}</td>
                      <td>{reservation.beginning}</td>
                      <td>{reservation.end}</td>
                      <td>{reservation.day + 1}</td>
                      <td>{reservation.username}</td>
                      <td>
                        {reservation.priceday * reservation.day +
                          reservation.priceday}{" "}
                        €
                      </td>
                      <td>{statusMap[reservation.status] || ""}</td>
                      <td>
                        {reservation.status !== "cancel" ? (
                          <button
                            type="button"
                            onClick={(event) =>
                              editReservation(
                                event,
                                reservation.id,
                                reservation.home_structure_id,
                                "cancel"
                              )
                            }
                          >
                            Annuler
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 className={styles.tableTitle}>Vous Gardez</h2>
            <div className={styles.tableContainer}>
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
                        index % 2 === 0
                          ? `${styles.rowPair}`
                          : `${styles.rowOdd}`
                      }
                      key={reservation.id}
                    >
                      <th scope="row">{reservation.id}</th>
                      <td>{reservation.username}</td>
                      <td>{reservation.name}</td>
                      <td>{reservation.beginning}</td>
                      <td>{reservation.end}</td>
                      <td>{reservation.day}</td>
                      <td>
                        {reservation.priceday * reservation.day +
                          reservation.priceday}{" "}
                        €
                      </td>
                      <td>{statusMap[reservation.status] || ""}</td>
                      <td>
                        <button
                          type="button"
                          onClick={(event) =>
                            editReservation(
                              event,
                              reservation.id,
                              reservation.home_structure_id,
                              "confirm",
                              reservation.username
                            )
                          }
                        >
                          Confirmer
                        </button>
                        <button
                          type="button"
                          onClick={(event) =>
                            editReservation(
                              event,
                              reservation.id,
                              reservation.home_structure_id,
                              "cancel",
                              reservation.username
                            )
                          }
                        >
                          Annuler
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ReservationPage;
