import { useState, useEffect } from "react";
import "./SearchPage.css";
import NavMenu from "../../components/nav_menu/NavMenu";
import Filter from "../../components/SearchPage/Filter";
import HomeStructureList from "../../components/SearchPage/HomeStructureList";
import BtnPrev from "../../assets/images/Btn-prev.png";
import BtnNext from "../../assets/images/Btn-next.png";

function SearchPage() {
  const [allStructures, setAllStructures] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredStructures, setFilteredStructures] = useState(allStructures);
  const [search, setSearch] = useState("");
  const [refetch, setRefetch] = useState(true);
  const [pageLim, setPageLim] = useState(0);
  const [pageLimSup, setPageLimSup] = useState(30);
  const [countPage, setCountPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3310/api/homestructure?q=${search}`
      );
      const jsonData = await response.json();
      setAllStructures(jsonData);
    };
    fetchData();
  }, [search]);

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

  const next = () => {
    setPageLim(pageLim + 30);
    setPageLimSup(pageLimSup + 30);
    setCountPage(countPage + 1);
  };

  const prev = () => {
    setPageLim(pageLim - 30);
    setPageLimSup(pageLimSup - 30);
    setCountPage(countPage - 1);
  };

  return (
    <>
      <NavMenu />
      <Filter
        onFilterChange={handleFilterChange}
        setRefetch={setRefetch}
        refetch={refetch}
        setSearch={setSearch}
        setCountPage={setCountPage}
        setPageLim={setPageLim}
        setPageLimSup={setPageLimSup}
      />
      {allStructures.length < 1 && search.length < 1 ? (
        <p className="loading">Chargement ...</p>
      ) : (
        <ul id="peopleMap">
          {filteredStructures.slice(pageLim, pageLimSup).map((structure) => (
            <li key={structure.id} id="peopleList">
              <HomeStructureList structure={structure} />
            </li>
          ))}
        </ul>
      )}
      {allStructures.length < 1 && search.length >= 1 && (
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
          hidden={Math.ceil(filteredStructures.length / 30) <= 1}
        >{`page ${countPage} sur ${Math.ceil(filteredStructures.length / 30)}`}</p>

        <button
          type="button"
          onClick={next}
          hidden={pageLimSup >= filteredStructures.length}
          className="buttonNextPrev"
        >
          <img className="buttonImg" src={BtnNext} alt="bouton suivant" />
        </button>
      </div>
    </>
  );
}

export default SearchPage;
