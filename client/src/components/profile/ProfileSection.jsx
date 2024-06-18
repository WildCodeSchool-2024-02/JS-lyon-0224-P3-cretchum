import PropTypes from "prop-types";
import styles from "./ProfileSection.module.css";

function ProfileSection({ title, children }) {
  return (
    <section className={styles.profileSection}>
      <header className={styles.profileSectionHeader}>
        <h2 className={styles.profilePageTitle}>{title}</h2>
      </header>
      <section className={styles.profileSectionContent}>{children}</section>
    </section>
  );
}

ProfileSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProfileSection;
