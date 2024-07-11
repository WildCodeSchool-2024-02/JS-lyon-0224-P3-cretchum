import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import notify from "../../utils/notify";
import "./SearchPage.css";
import NavMenu from "../../components/nav_menu/NavMenu";
import Filter from "../../components/search_page_components/filter/Filter";
import HomeStructureList from "../../components/search_page_components/home_strucutre_list/HomeStructureList";
import BtnPrev from "../../assets/images/Btn-prev.png";
import BtnNext from "../../assets/images/Btn-next.png";

function SearchPage() {
  const [allStructures, setAllStructures] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredStructures, setFilteredStructures] = useState(allStructures);
  const [search, setSearch] = useState("");
  const [limit] = useState(30);
  const [offset, setOffset] = useState(0);
  const [countPage, setCountPage] = useState(1);
  const [reponseNumber, setReponseNumber] = useState(0);
  const URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (search.length < 3 && search.length > 0) {
        // Do not search if search string is less than 3 characters but not empty
        return;
      }
      try {
        const response = await fetch(
          `${URL}homestructure?search=${search}&limit=${limit}&offset=${offset}`
        );
        if (response.status !== 200) {
          throw new Error("Erreur lors de la récupération des données.");
        }
        const jsonData = await response.json();
        setAllStructures(jsonData.result);
        setReponseNumber(jsonData.totalRow.total);
      } catch (error) {
        notify("Erreur de réseau. Veuillez vérifier votre connexion.", "error");
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [search, URL, offset, limit]);

  useEffect(() => {
    const applyFilters = () => {
      // Start with all structures
      let filtered = allStructures;
      // Apply postal code filter
      if (filters.postalCode !== undefined) {
        filtered = filtered.filter((structure) =>
          structure.postal_code.toString().includes(filters.postalCode)
        );
      }

      // Apply animal filter
      if (filters.animal !== "tous") {
        // Filter structures that have cats
        if (filters.animal === "chat") {
          filtered = filtered.filter((structure) => structure.cat === 1);
        } else if (filters.animal === "chien") {
          // Filter structures that have dogs
          filtered = filtered.filter((structure) => structure.dog === 1);
        }
      }

      if (filters.structureType !== "tous") {
        // Filter structures that have cats
        if (filters.structureType === "particulier") {
          filtered = filtered.filter(
            (structure) => structure.is_professional === 0
          );
        } else if (filters.structureType === "professionnel") {
          // Filter structures that have dogs
          filtered = filtered.filter(
            (structure) => structure.is_professional === 1
          );
        }
      }

      // Apply price range filter
      if (filters.priceRange !== "tous") {
        if (filters.priceRange === "fourchette1") {
          filtered = filtered.filter(
            // Filter structures with price between 10 and 20
            (structure) => structure.price >= 10 && structure.price <= 20
          );
        } else if (filters.priceRange === "fourchette2") {
          filtered = filtered.filter(
            // Filter structures with price between 20 et 30
            (structure) => structure.price >= 20 && structure.price <= 30
          );
        }
      }

      // Update the filtered structures state
      setFilteredStructures(filtered);
    };

    // Call the applyFilters function to update the filtered structures
    applyFilters();
  }, [filters, allStructures, search]); // Dependencies: re-run effect when filters or allStructures change

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
    // Update the filters state with the new filters
    setFilters(newFilters);
  };
  // button for next and prev page
  const next = () => {
    setOffset(offset + limit);
    setCountPage(countPage + 1);
  };
  const prev = () => {
    setOffset(offset - limit);
    setCountPage(countPage - 1);
  };

  return (
    <>
      <NavMenu />
      <Filter
        onFilterChange={handleFilterChange}
        setSearch={setSearch}
        setCountPage={setCountPage}
        setOffset={setOffset}
      />
      {allStructures.length < 1 && search.length < 1 ? (
        <p className="loading">Chargement ...</p>
      ) : (
        <ul id="peopleMap">
          {filteredStructures.map((structure) => (
            <li key={structure.id} id="peopleList">
              <Link to={`/reservation/${structure.id}`}>
                <HomeStructureList structure={structure} />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {filteredStructures.length < 1 && search.length >= 3 && (
        <p className="loading">Aucun résultat</p>
      )}
      <div className="nextPrev">
        <button
          type="button"
          className="buttonNextPrev"
          onClick={prev}
          hidden={countPage <= 1}
        >
          <img className="buttonImg" src={BtnPrev} alt="bouton précedent" />
        </button>

        <p
          hidden={Math.ceil(reponseNumber / limit) <= 1}
        >{`page ${countPage} sur ${Math.ceil(reponseNumber / limit)}`}</p>

        <button
          type="button"
          onClick={next}
          hidden={reponseNumber <= limit}
          className="buttonNextPrev"
        >
          <img className="buttonImg" src={BtnNext} alt="bouton suivant" />
        </button>
      </div>
    </>
  );
}

export default SearchPage;
