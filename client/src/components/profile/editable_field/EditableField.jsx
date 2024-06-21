import PropTypes from "prop-types";
import styles from "./EditableField.module.css";

function EditableField({ label, value, isEditMode, onChange, labelClass }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input
        type="text"
        defaultValue={value}
        readOnly={!isEditMode === true}
        onChange={isEditMode === true ? onChange : undefined}
        className={`${styles.input} ${!isEditMode === true ? styles.readOnlyInput : ""}`}
      />
    </div>
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
