import PropTypes from "prop-types";
import "./IsProfessionnal.css";

function IsProfessionnal({ professional }) {
  return (
    <p
      className="userStructure"
      id={professional === 0 ? "userParticulier" : "userChenil"}
    >
      {professional === 0 ? "particulier" : "professionnel"}
    </p>
  );
}

export default IsProfessionnal;

IsProfessionnal.propTypes = {
  professional: PropTypes.number.isRequired,
};
