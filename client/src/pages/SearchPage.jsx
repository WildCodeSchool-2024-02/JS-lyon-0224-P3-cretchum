import HomeStructureList from "../components/SearchPage/HomeStructureList";
import Filter from "../components/SearchPage/Filter";
import personImage from "../assets/images/person.jpg";
import "./SearchPage.css";

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
      img: personImage,
    },
    {
      id: 2,
      name: "Bob",
      city: "Perrache",
      cat: true,
      dog: false,
      professionnel: false,
      price: 22,
      img: personImage,
    },
    {
      id: 3,
      name: "Mike",
      city: "Villeurbanne",
      cat: false,
      dog: true,
      professionnel: false,
      price: 24,
      img: personImage,
    },
    {
      id: 4,
      name: "Pedro",
      city: "Perrache",
      cat: true,
      dog: true,
      professionnel: true,
      price: 22,
      img: personImage,
    },
    {
      id: 5,
      name: "Bob",
      city: "Perrache",
      cat: true,
      dog: false,
      professionnel: false,
      price: 22,
      img: personImage,
    },
    {
      id: 6,
      name: "Mike",
      city: "Villeurbanne",
      cat: false,
      dog: true,
      professionnel: false,
      price: 24,
      img: personImage,
    },
  ];

  const allpeople = peoples.map((people) => (
    <li key={people.id} id="peopleList">
      <HomeStructureList structure={people} />
    </li>
  ));

  return (
    <>
      <Filter />
      <ul id="peoplemap">{allpeople}</ul>
    </>
  );
}

export default SearchPage;
