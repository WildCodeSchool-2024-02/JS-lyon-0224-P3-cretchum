import HomeStructureList from "../components/SearchPage/HomeStructureList";
import personImage from "../assets/images/person.jpg";

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
      id: 2,
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
    <li key={people.id}>
      <HomeStructureList structure={people} />
    </li>
  ));

  return <ul>{allpeople}</ul>;
}

export default SearchPage;
