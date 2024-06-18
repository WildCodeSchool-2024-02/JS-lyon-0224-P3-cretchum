import PropTypes from "prop-types";
import styles from "./EditableField.module.css";

function EditableField({ label, value, isEditMode, onChange, labelClass }) {
  return (
    <p>
      <span className={labelClass}>{label}</span>{" "}
      {isEditMode ===true ? (
        <input
          type="text"
          defaultValue={value}
          onChange={onChange}
          className={styles.input}
        />
      ) : (
        value
      )}
    </p>
  );
}

EditableField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  labelClass: PropTypes.string,
};

EditableField.defaultProps = {
  onChange: () => {},
  labelClass: "",
};

export default EditableField;
