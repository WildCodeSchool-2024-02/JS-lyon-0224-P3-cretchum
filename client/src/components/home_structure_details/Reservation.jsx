import { useEffect, useState, useMemo } from "react";
import { Form, Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Reservation.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";

const URL = import.meta.env.VITE_API_URL;

function Reservation({ priceday, auth }) {
  const [animalData, setAnimalData] = useState([]);
  useEffect(() => {
    if (auth !== null && (auth !== false && auth.user.hasAnimals !== false)) {
      const fetchAnimals = async () => {
        try {
          const response = await fetch(`${URL}/animal/${auth.user.sub}`);
          if (response.status === 200) {
            const data = await response.json();
            setAnimalData(data);
          } else {
            console.error("Fetch profile error:", response.statusText);
          }
        } catch (err) {
          console.error("Fetch profile error:", err);
        }
      };
      fetchAnimals();
    }
  }, [auth]);

  // Get today date
  const todayDate = useMemo(() => dayjs(), []);

  const [startingDate, setStartingDate] = useState(todayDate);
  const [endingDate, setEndingDate] = useState(todayDate);

  // calculating the number of days difference between the start and end date
  const dateDiffInDays = (start, end) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);
    const diffInDays = endDate.diff(startDate, "day") + 1;
    return diffInDays;
  };

  const datediff = dateDiffInDays(startingDate, endingDate);

  // calculating price
  const price = priceday * datediff;

  // avoiding ending date to go before startingDate
  useEffect(() => {
    if (dayjs(endingDate) < dayjs(startingDate)) {
      setEndingDate(startingDate);
    }

    if (dayjs(startingDate) < dayjs(todayDate)) {
      setStartingDate(todayDate);
    }
  }, [startingDate, endingDate, todayDate]);

  return (
    <section id="reservation">
      <Form method="post" id="reservationForm">
        <div id="userChoice">
          <h2 id="totalPrice">TOTAL {price} €</h2>

          {auth !== null && (auth === false || auth.user.hasAnimals === false) ? (
            <>
              <p id="authDenied">
                Vous devez avoir au moins un animal enregistré pour réserver
              </p>
              <Link to="/connexion" id="deniedLink">
                Me Connecter
              </Link>
            </>
          ) : (
            <>
              <div id="datesChoice">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="fr"
                >
                  <div className="datesInput">
                    <DatePicker
                      label="Début"
                      name="startingDate"
                      value={startingDate}
                      onChange={(newValue) => setStartingDate(newValue)}
                      minDate={todayDate}
                    />
                  </div>

                  <div className="datesInput">
                    <DatePicker
                      label="Fin"
                      name="endingDate"
                      value={endingDate}
                      onChange={(newValue) => setEndingDate(newValue)}
                      minDate={startingDate}
                    />
                  </div>
                </LocalizationProvider>
              </div>
              <div id="reservationPets">
                <h4 id="resaH4">Pour qui ?</h4>
                <select className="filterInput reservationInput">
                  <option value="tous">Tous mes animaux</option>;
                  {animalData.map((animal) => (
                    <option key={animal.id} value={animal.name}>
                      {animal.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="searchBtn buttonType1"
                disabled={auth !== null || auth !== false || auth.user.hasAnimals === false}
              >
                Réserver
              </button>
            </>
          )}
        </div>
      </Form>
      <div id="reservationDetails">
        <h3>Détails</h3>
        <hr id="detailsLine" />
        <p>
          {priceday} € / jour(s) x {datediff} jour(s)
        </p>
      </div>
    </section>
  );
}

Reservation.propTypes = {
  priceday: PropTypes.number.isRequired,
  auth: PropTypes.shape({ 
    user: PropTypes.shape({
      hasAnimals: PropTypes.bool.isRequired,
      sub : PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Reservation;
