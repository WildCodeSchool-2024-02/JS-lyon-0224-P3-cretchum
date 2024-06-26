import PropTypes from "prop-types";
import styles from "./EditableTextarea.module.css";

function EditableTextarea({ value, isEditMode, valueName, setCustomer }) {
  const onChange = (e, champ) => {
    setCustomer((user) => ({ ...user, [champ]: e.target.value }));
  };

  return (
    <div className={styles.textareaContainer}>
      <textarea
        className={
          isEditMode === false ? styles.readOnlyTextarea : styles.textarea
        }
        defaultValue={value}
        onChange={
          isEditMode === true ? (e) => onChange(e, valueName) : undefined
        }
        readOnly={isEditMode !== true}
      />
    </div>
  );
}

EditableTextarea.propTypes = {
  value: PropTypes.string.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setCustomer: PropTypes.func.isRequired,
  valueName: PropTypes.string.isRequired,
};

export default EditableTextarea;
