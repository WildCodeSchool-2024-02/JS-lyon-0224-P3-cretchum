import PropTypes from "prop-types";
import styles from "./EditableField.module.css";

function EditableField({ label, value, isEditMode, valueName, setCustomer }) {
  const onChange = (e, champ) => {
    setCustomer((user) => ({ ...user, [champ]: e.target.value }));
  };
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        defaultValue={value}
        readOnly={!isEditMode}
        onChange={isEditMode ? (e) => onChange(e, valueName) : undefined}
        className={`${styles.input} ${!isEditMode ? styles.readOnlyInput : ""}`}
      />
    </div>
  );
}

EditableField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  valueName: PropTypes.string.isRequired,
  setCustomer: PropTypes.func.isRequired,
};

// EditableField.defaultProps = {
//   onChange: () => {},
//   labelClass: "",
// };

export default EditableField;
