import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import "./Reservation.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/fr";

function Reservation({ priceday, auth, structures }) {
  const URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [animalData, setAnimalData] = useState([]);
  const [selectedAnimals, setSelectedAnimals] = useState([]);
  useEffect(() => {
    if (auth !== null && auth !== false && auth.user.hasAnimals !== false) {
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
  }, [URL, auth]);

  const todayDate = useRef(dayjs()).current;

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
  const price = priceday * datediff * selectedAnimals.length;

  // avoiding ending date to go before startingDate
  useEffect(() => {
    if (dayjs(endingDate) < dayjs(startingDate)) {
      setEndingDate(startingDate);
    }

    if (dayjs(startingDate) < dayjs(todayDate)) {
      setStartingDate(todayDate);
    }
  }, [startingDate, endingDate, todayDate]);

  const handleReservation = async (event) => {
    event.preventDefault();
    try {
      const data = [];
      let count = 0;
      for (let i = 0; i < animalData.length; i += 1) {
        if (selectedAnimals.includes(animalData[i].id) === true) {
          data[count] = {
            reservation_date_beginning:
              dayjs(startingDate).format("YYYY-MM-DD"),
            reservation_date_end: dayjs(endingDate).format("YYYY-MM-DD"),
            home_structure_id: structures.id,
            animal_id: animalData[i].id,
            priceday,
          };
          count += 1;
        }
      }
      const response = await fetch(`${URL}reservation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credential: "include",
      });

      if (response.status === 201) {
        navigate("/reservation");
        return toast.success("Réservation reussie");
      }
      return toast.error("Une erreur est survenue lors de la réservation");
    } catch (err) {
      return console.error(
        "Une erreur est survenue lors de la réservation",
        "error"
      );
    }
  };

  const handleCheckedAnimals = (event) => {
    const animalId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setSelectedAnimals([...selectedAnimals, animalId]);
    } else {
      setSelectedAnimals(selectedAnimals.filter((id) => id !== animalId));
    }
  };

  return (
    <section id="reservation">
      <form method="post" onSubmit={handleReservation} id="reservationForm">
        <div id="userChoice">
          <h2 id="totalPrice">TOTAL {price} €</h2>

          {auth !== null &&
          (auth === false || auth.user.hasAnimals === false) ? (
            <>
              <p id="authDenied">
                Vous devez avoir au moins un animal enregistré pour réserver
              </p>
              {(auth === false) ? (
                <Link to="/connexion" id="deniedLink">
                  Me Connecter
                </Link>
              ) : (
                <Link to={`/formulaire-animal/${auth.user.sub}`} id="deniedLink">
                  Ajouter un animal
                </Link>
              )}
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
                <fieldset className="filterInput reservationInput">
                  <legend id="resaH4">Pour qui ?</legend>
                  {animalData.map((animal) => (
                    <div key={animal.id}>
                      <input
                        className="test"
                        type="checkbox"
                        onChange={handleCheckedAnimals}
                        value={animal.id}
                        name="animals"
                      />
                      <label htmlFor={animal.id}>{animal.name}</label>
                    </div>
                  ))}
                </fieldset>
              </div>
              <button type="submit" className="searchBtn buttonType1">
                Réserver
              </button>
            </>
          )}
        </div>
      </form>
      <div id="reservationDetails">
        <h3>Détails</h3>
        <hr id="detailsLine" />
        <p>
          {priceday} € / jour(s) x {datediff} jour(s) x {selectedAnimals.length} animaux
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
      sub: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  structures: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Reservation;
