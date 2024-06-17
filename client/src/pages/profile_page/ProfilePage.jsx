import { useLoaderData } from "react-router-dom";
import "./profilePage.css";

import LogoCicorne from "../../assets/logo/cicorne.png";

function ProfilePage() {
  const structures = useLoaderData()

  return (
    <div className="profile-page-container">
      <header className="profile-page-header">
        <img
          className="profile-page-img"
          src={LogoCicorne}
          alt="user profile"
        />
        <section className="profile-page-h1-container">
          <h1 className="profile-page-h1">
            {structures.lastname} {structures.firstname}
          </h1>
        </section>
      </header>
      <section className="profile-section profile-section-information">
        <header className="profile-section-header">
          <h2 className="profile-page-title">Informations générales</h2>
        </header>
        <section className="profile-section-content">
          <p className="profile-firstname">Nom : {structures.lastname}</p>
          <p className="profile-lastname">Prenom : {structures.firstname}</p>
          <address className="profile-address-container">
            <a
              href={`tel:${structures.phone_number}`}
              className="profile-phone"
            >
              Téléphone : {structures.phone_number}
            </a>
            <a href={`mailto:${structures.mail}`} className="profile-email">
              email : {structures.mail}
            </a>
          </address>
        </section>
      </section>
      <section className="profile-section profile-section-description">
        <header className="profile-section-header">
          <h2 className="profile-page-title">Description</h2>
        </header>
        <section className="profile-section-content">
          <p>{structures.description}</p>
        </section>
      </section>
      <section className="profile-section profile-section-reservation">
        <header className="profile-section-header">
          <h2 className="profile-page-title">Vos réservations</h2>
        </header>
        <section className="profile-section-content">
          <ul>
            <li className="profile-li-reservation">Aucune réservations</li>
          </ul>
        </section>
      </section>
    </div>
  );
}

export default ProfilePage;
