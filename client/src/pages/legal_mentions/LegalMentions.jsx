import styles from './LegalMentions.module.css';
import Section from "../../components/section/Section";

function LegalMentions() {
  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.title}>Mentions légales du site Cretchom</h1>

        <Section title="Propriétaire du site : Wild Code School">
          <p className={styles.text}>
            Avant toute utilisation du site Internet et des services proposés
            par la Wild Code School (marque enregistrée par la société
            INNOV’EDUC), vous devez lire attentivement les présentes Conditions
            Générales d’Utilisation et de Services, car elles contiennent
            d’importantes informations et stipulations, relatives à vos
            obligations, droits et recours.
          </p>
          <p className={styles.text}>
            Les présentes Conditions Générales d’Utilisation et de Services
            (ci-après les « Conditions Générales ») des sites wildcodeschool.com
            et odyssey.wildcodeschool.com (ci-après le « Site ») sont éditées
            par la société INNOV’EDUC (ci-après la « Société »), société par
            actions simplifiées au capital social de 14 250 €, dont le siège
            social est situé au 44 rue Alphonse Penaud, 75020 Paris (RCS
            Chartres 794 926 063), société éditrice du site wildcodeschool.com,
            dont le numéro de TVA intracommunautaire est FR 27 794 926 063.
            Organisme de formation enregistré auprès du Préfet de la région
            Centre le 23 juin 2014 sous le n° 24 28 0154228.
          </p>
        </Section>

        <Section title="Hébergement du site :">
          <p className={styles.text}>Nom de l’hébergeur : [A remplir]</p>
          <p className={styles.text}>Raison sociale : [A remplir]</p>
          <p className={styles.text}>Adresse : [A remplir]</p>
          <p className={styles.text}>Numéro de téléphone : [A remplir]</p>
        </Section>

        <Section title="Propriété intellectuelle :">
          <p className={styles.text}>
            Les images, illustrations, photographies utilisées sur ce site sont
            protégées par des droits de propriété intellectuelle. Toute
            reproduction ou représentation, intégrale ou partielle, faite sans
            le consentement de l'auteur est interdite. Les textes ne provenant
            pas de notre propre rédaction sont accompagnés de la mention de leur
            source ou de l'autorisation de l'auteur.
          </p>
        </Section>

        <Section title="Données personnelles :">
          <p className={styles.text}>
            Conformément au Règlement général sur la protection des données
            (RGPD), nous nous engageons à respecter la confidentialité des
            données personnelles collectées sur notre site. Vous disposez d’un
            droit d’accès, de rectification et d’effacement de vos données. Pour
            exercer ces droits, veuillez contacter :
          </p>
          <p className={styles.text}>
            Identité du responsable du traitement de données : [Votre Nom]
          </p>
          <p className={styles.text}>
            Coordonnées du délégué à la protection des données (DPO) :
            [Coordonnées du DPO]
          </p>
          <p className={styles.text}>
            Base juridique du traitement de données : [Consentement, Obligation
            légale, Exécution d’un contrat, etc.]
          </p>
          <p className={styles.text}>
            Finalité des données collectées : Les données d’identification (nom
            ; prénom ; adresse email personnelle et professionnelle ; numéro de
            téléphone ; âge ; ville ; adresse ip)
          </p>
          <p className={styles.text}>
            Durée de conservation des données : [Durée de Conservation]
          </p>
          <p className={styles.text}>
            Droits de l’internaute : droit de refuser la collecte, droit
            d’accéder, de rectifier et d’effacer ses données, et droit de
            déposer une plainte auprès de la Cnil.
          </p>
          <p className={styles.text}>
            Commission Nationale de l’Informatique et des Libertés (CNIL) 3
            Place de Fontenoy TSA 80715 75334 PARIS CEDEX 07 Tél : 01 53 73 22
            22
          </p>
        </Section>

        <Section title="Cookies :">
          <p className={styles.text}>
            Nous utilisons des cookies pour la connexion de l'utilisateur. Vous
            êtes informé(e) de l’utilisation des cookies et devez donner votre
            consentement pour leur utilisation.
          </p>
        </Section>

        <Section title="Conditions générales de vente (CGV) :">
          <p className={styles.text}>
            Les conditions générales de vente sont disponibles sur notre site et
            régissent les relations contractuelles entre Cretchom et ses
            clients.
          </p>
        </Section>

        <Section title="Contact :">
          <p className={styles.text}>
            Pour toute question relative aux mentions légales de notre site,
            vous pouvez nous contacter par email à contact@wildcodeschool.fr ou
            par courrier au Innov'Educ, à l’attention de service Protection des
            Données, 18 rue de la Gare, 28240, La Loupe.
          </p>
        </Section>

        <h3 className={styles.titleH3}>
          Nous vous remercions de votre confiance et de votre visite sur notre
          site.
        </h3>
      </div>
    </div>
  );
}

export default LegalMentions;