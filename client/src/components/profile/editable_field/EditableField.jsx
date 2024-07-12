import PropTypes from "prop-types";
import styles from "./EditableField.module.css";

function EditableField({ label, value, isEditMode, valueName, onChange }) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      <input
        type="text"
        defaultValue={value}
        readOnly={isEditMode === false}
        onChange={
          isEditMode === true ? (e) => onChange(e, valueName) : undefined
        }
        className={`${styles.input} ${isEditMode === false ? styles.readOnlyInput : ""}`}
      />
    </div>
  );
}

EditableField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isEditMode: PropTypes.bool.isRequired,
  valueName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditableField;
