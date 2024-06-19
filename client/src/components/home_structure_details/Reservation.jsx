import { useState } from "react";
import { Form } from "react-router-dom";
import PropTypes from "prop-types";

import "./Reservation.css";

function Reservation({ priceday }) {
  // Get today date
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const todayDate = `${year}-${month}-${day}`;

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

  return (
    <section id="reservation">
      <Form method="post" id="reservationForm">
        <div>
          <h2 id="totalPrice">TOTAL {price} €</h2>
          <div id="DatesChoice">
            <p>du </p>
            <input
              className="reservationDate"
              type="date"
              id="start"
              name="starting"
              value={startingDate}
              min={todayDate}
              onChange={(e) => setStartingDate(e.target.value)}
            />

            <p>au</p>
            <input
              className="reservationDate"
              type="date"
              id="end"
              name="ending"
              value={endingDate}
              min={startingDate}
              onChange={(e) => setEndingDate(e.target.value)}
            />
          </div>
          <div id="reservationPets">
            <p>Pour qui ?</p>
            <select className="filterInput reservationInput">
              <option value="tous">Tous mes animaux</option>;
              <option value="tous">nom1</option>
              <option value="tous">nom2</option>
            </select>
          </div>
        </div>

        <button type="submit" className="buttonType1">
          Réserver
        </button>
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
