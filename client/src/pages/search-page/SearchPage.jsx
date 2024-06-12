import { useState, useEffect } from "react";
import "./SearchPage.css";
import NavMenu from "../../components/nav_menu/NavMenu";
import Filter from "../../components/SearchPage/Filter";
import HomeStructureList from "../../components/SearchPage/HomeStructureList";

function SearchPage() {
  const [filters, setFilters] = useState({});
  const [allStructures, setAllStructures] = useState([]);
  const [filteredStructures, setFilteredStructures] = useState([]);

  // Fetch all structures when the component mounts
  useEffect(() => {
    fetch('http://localhost:3310/api/homestructure')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setAllStructures(data);
      })
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  // Apply filters whenever filters or allStructures change
  useEffect(() => {
    const applyFilters = () => {
      // Start with all structures
      let filtered = allStructures;

      // Apply postal code filter
      if (filters.postalCode) {
        filtered = filtered.filter((structure) =>
          structure.postal_code.toString().includes(filters.postalCode)
        );
      }

      // Apply animal filter
      if (filters.animal && filters.animal !== "tous") {
        // Filter structures that have cats
        if (filters.animal === "chat") {
          filtered = filtered.filter((structure) => structure.cat === 1);
        } else if (filters.animal === "chien") {
          // Filter structures that have dogs
          filtered = filtered.filter((structure) => structure.dog === 1);
        }
      }

      // Apply structure type filter
      if (filters.structureType && filters.structureType !== "tous") {
        filtered = filtered.filter(
          (structure) =>
            structure.is_professional ===
            (filters.structureType === "professionnel" ? 1 : 0)
        );
      }

      // Apply price range filter
      if (filters.priceRange && filters.priceRange !== "tous") {
        if (filters.priceRange === "fourchette1") {
          filtered = filtered.filter(
            // Filter structures with price between 10 and 20
            (structure) => structure.price >= 10 && structure.price <= 20
          );
        } else if (filters.priceRange === "fourchette2") {
          filtered = filtered.filter(
            // Filter structures with price between 20 and 30
            (structure) => structure.price >= 20 && structure.price <= 30
          );
        }
      }

      // Update the filtered structures state
      setFilteredStructures(filtered);
    };

    // Call the applyFilters function to update the filtered structures
    applyFilters();
  }, [filters, allStructures]); // Dependencies: re-run effect when filters or allStructures change

  // Function to handle filter changes
  const handleFilterChange = (newFilters) => {
     // Update the filters state with the new filters
    setFilters(newFilters);
  };

  return (
    <>
      <NavMenu />
      <Filter onFilterChange={handleFilterChange} />
      <ul id="peopleMap">
        {filteredStructures.map((structure) => (
          <li key={structure.id} id="peopleList">
            <HomeStructureList structure={structure} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchPage;