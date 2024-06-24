import PropTypes from "prop-types";
import styles from "./EditableTextarea.module.css";

function EditableTextarea({ label, value, isEditMode, onChange, labelClass }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea
        defaultValue={value}
        readOnly={!isEditMode === true}
        onChange={isEditMode === true ? onChange : undefined}
        className={`${styles.textarea} ${!isEditMode ? styles.readOnlyTextarea : ""}`}
      />
    </div>
  );
}

EditableTextarea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  labelClass: PropTypes.string,
};

EditableTextarea.defaultProps = {
  onChange: () => {},
  label: "",
  labelClass: "",
};

export default EditableTextarea;
