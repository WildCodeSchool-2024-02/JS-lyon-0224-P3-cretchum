import { useEffect, useState } from "react";
import notify from "../../utils/notify";
import NavMenu from "../../components/nav_menu/NavMenu";
import styles from "./ReservationPage.module.css";

function ReservationPage() {
  const statusMap = {
    waiting: "En attente",
    confirm: "Confirmé",
    cancel: "Annulé",
  };
  const URL = import.meta.env.VITE_API_URL;
  const [change, setChange] = useState(false);

  // Fetch received Reservation as home_structure
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
  }, [URL, change]);

  // Fetch reservation as user
  const [reservations, setReservation] = useState([]);
  useEffect(() => {
    const reservationLoader = async () => {
      try {
        const response = await fetch(`${URL}reservation`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status !== 200) {
          notify(
            "Erreur lors de la récupération des données du profil !",
            "error"
          );
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        setReservation(data);
      } catch (err) {
        console.error("Fetch profile error:", err);
        notify(
          "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard.",
          "error"
        );
      }
    };
    reservationLoader();
  }, [URL, change]);

  // Fetch notifications
  const [notification, setNotification] = useState(0);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`${URL}notification/`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setNotification(data);
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };
    fetchReservation();
  }, [URL, change]);

  const reservationIds =
    notification.length > 0 &&
    notification.map((value) => value.reservation_id);

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
        setChange(!change);
      }
    } catch (err) {
      console.error("Fetch error", err);
    }
  };

  const deleteNotification = async () => {
    if (notification.length > 0) {
      try {
        const response = await fetch(`${URL}notification/`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notification,
          }),
        });
        if (response.status === 204) {
          setChange(!change);
        } else {
          notify("Une erreur est survenue", "error");
        }
      } catch (err) {
        console.error("Fetch error", err);
      }
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
            <span id={styles.readButtonContainer}>
              <button
                type="button"
                id={styles.deleteNotification}
                className={notification.length > 0 ? "" : styles.none}
                onClick={deleteNotification}
              >
                Marquer les réservations comme vues
              </button>
            </span>
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
                        reservationIds.length > 0 &&
                        reservationIds.includes(reservation.id)
                          ? `${styles.notify} ${styles.row} `
                          : `${styles[`row${index % 2}`]}`
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
                        reservationIds.length > 0 &&
                        reservationIds.includes(reservation.id)
                          ? `${styles.notify} ${styles.row} `
                          : `${styles[`row${index % 2}`]}`
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
                        {reservation.status !== "confirm" &&
                          reservation.status !== "cancel" && (
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
                          )}
                        {reservation.status !== "cancel" && (
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
                        )}
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
