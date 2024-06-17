import { useState } from "react";
import { Form } from "react-router-dom";

import "./PriceDetails.css";

function PriceDetails() {
  const priceday = 32; // info en dure à supprimer une fois la base de données récupérées

  // Récupération de la date d'aujourd'hui
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const todayDate = `${year}-${month}-${day}`;

  const [startingDate, setStartingDate] = useState(todayDate);
  const [endingDate, setEndingDate] = useState(todayDate);

  // cacul du nombre de jours de différence entre la date de début et de fin
  const dateDiffInDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInTime = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.round(diffInDays) + 1;
  };

  const datediff = dateDiffInDays(startingDate, endingDate);

  // calcul du prix
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

        <button type="submit" id="reservationButton">
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

export default PriceDetails;
