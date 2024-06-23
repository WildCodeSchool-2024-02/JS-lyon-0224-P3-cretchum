import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import PropTypes from "prop-types";
import "./Reservation.css";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";

function Reservation({ priceday }) {
  // Get today date

  const todayDate = dayjs();

  const [startingDate, setStartingDate] = useState(todayDate);
  const [endingDate, setEndingDate] = useState(todayDate);

  // calculating the number of days difference between the start and end date
  const dateDiffInDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.round(diffInDays) + 1;
  };

  const datediff = dateDiffInDays(startingDate, endingDate);

  // calculating price
  const price = priceday * datediff;

  // avoiding ending date to go before startingDate
  useEffect(() => {
    if (new Date(endingDate) < new Date(startingDate)) {
      setEndingDate(startingDate);
    }

    if (new Date(endingDate) < new Date(todayDate)) {
      setStartingDate(todayDate);
    }
  }, [startingDate, endingDate, todayDate]);

  return (

    <section id="reservation">
      <Form method="post" id="reservationForm">
        <div id="userChoice">
          <h2 id="totalPrice">TOTAL {price} €</h2>
          <div id="datesChoice">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
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
              <option value="animal1">nom1</option>
              <option value="animal2">nom2</option>
            </select>
        </div>
        <button type="submit" className="searchBtn buttonType1">
          Réserver
        </button>
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
};

export default Reservation;
