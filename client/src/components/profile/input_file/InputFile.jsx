import { toast } from "react-toastify";
import PropTypes from "prop-types";
import styles from "./InputFile.module.css";

function InputFile({ changeAvatar, setChangeAvatar, customer }) {
  const URL = import.meta.env.VITE_API_URL;
  // Profile picture update
  const imageHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    try {
      const response = await fetch(`${URL}/image/${customer.id}`, {
        method: "PUT",
        credentials: "include",
        body: formData,
      });
      if (response.status !== 204) {
        toast.error(
          "Erreur lors de l'upload de limage, verifier que votre image fait moins de 1 mo et qu'elle est du type jpeg/jpg/png/gif"
        );

        throw new Error("Erreur lors du téléchargement de l'image");
      }

      if (response.status === 204) {
        toast.success("Image téléchargée avec succès");
        setChangeAvatar(!changeAvatar);
        setTimeout(() => {
          window.location.reload();
        }, "2000");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
  return (
    <form
      className={styles.avatarForm}
      onSubmit={imageHandler}
      encType="multipart/form-data"
      method="post"
    >
      {" "}
      <label htmlFor="lastname">Modifier votre avatar :</label>
      <span className={styles.inputFile}>
        {" "}
        <input type="file" name="avatar" />
        <button className={styles.avatarButton} type="submit">
          Valider
        </button>
      </span>
    </form>
  );
}
InputFile.propTypes = {
  setChangeAvatar: PropTypes.func.isRequired,
  changeAvatar: PropTypes.bool.isRequired,
  customer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    description: PropTypes.string,
    mail: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }).isRequired,
};
export default InputFile;
