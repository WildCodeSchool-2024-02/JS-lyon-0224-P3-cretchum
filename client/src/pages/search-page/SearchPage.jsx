import HomeStructureList from "../../components/SearchPage/HomeStructureList";
import Filter from "../../components/SearchPage/Filter";
import PersonImage from "../../assets/images/person.jpg";
import "./SearchPage.css";
import NavMenu from "../../components/nav_menu/NavMenu";

function SearchPage() {
  const peoples = [
    {
      id: 1,
      name: "Pedro",
      city: "Perrache",
      cat: true,
      dog: true,
      professionnel: true,
      price: 22,
      img: PersonImage,
    },
    {
      id: 2,
      name: "Bob",
      city: "Perrache",
      cat: true,
      dog: false,
      professionnel: false,
      price: 22,
      img: PersonImage,
    },
    {
      id: 3,
      name: "Mike",
      city: "Villeurbanne",
      cat: false,
      dog: true,
      professionnel: false,
      price: 24,
      img: PersonImage,
    },
    {
      id: 4,
      name: "Pedro",
      city: "Perrache",
      cat: true,
      dog: true,
      professionnel: true,
      price: 22,
      img: PersonImage,
    },
    {
      id: 5,
      name: "Bob",
      city: "Perrache",
      cat: true,
      dog: false,
      professionnel: false,
      price: 22,
      img: PersonImage,
    },
    {
      id: 6,
      name: "Mike",
      city: "Villeurbanne",
      cat: false,
      dog: true,
      professionnel: false,
      price: 24,
      img: PersonImage,
    },
  ];

  const allpeople = peoples.map((people) => (
    <li key={people.id} id="peopleList">
      <HomeStructureList structure={people} />
    </li>
  ));

  return (
    <>
      <NavMenu />
      <Filter />
      <ul id="peopleMap">{allpeople}</ul>
    </>
  );
}

export default SearchPage;
