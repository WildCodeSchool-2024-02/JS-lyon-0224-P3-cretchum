import PropTypes from "prop-types";
import styles from "../../pages/reservation/ReservationPage.module.css";

function HeaderReservation({ title }) {
  return (
    <header className={styles.reservationHeader}>
      <h2 id={styles.reservationTitle}>{title}</h2>
    </header>
  );
}

HeaderReservation.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderReservation;
