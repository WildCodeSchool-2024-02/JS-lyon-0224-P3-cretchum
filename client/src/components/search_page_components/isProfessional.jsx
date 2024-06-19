import PropTypes from "prop-types";
import "./IsProfessionnal.css";

function IsProfessionnal({ professional }) {
  const isProfessionnal = professional === 1;

  return (
    <p
      className="userStructure"
      id={isProfessionnal === false ? "userParticulier" : "userChenil"}
    >
      {isProfessionnal === false ? "particulier" : "professionnel"}
    </p>
  );
}

export default IsProfessionnal;

IsProfessionnal.propTypes = {
  professional: PropTypes.number.isRequired,
};
