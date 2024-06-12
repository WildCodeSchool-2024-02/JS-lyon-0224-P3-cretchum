import { useLoaderData } from "react-router-dom";

import HomeStructureList from "../../components/SearchPage/HomeStructureList";
import Filter from "../../components/SearchPage/Filter";
import "./SearchPage.css";
import NavMenu from "../../components/nav_menu/NavMenu";

function SearchPage() {
  const peoples = useLoaderData()

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
