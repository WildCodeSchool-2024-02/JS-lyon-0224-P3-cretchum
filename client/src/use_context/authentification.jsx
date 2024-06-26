import { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

const URL = import.meta.env.VITE_API_URL;

const AuthentificationContext = createContext();

function AuthentificationProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/auth`, {
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        setAuth(data);
      } 
      }
    catch (error) {
      console.error("Error fetching data:", error);
    }}

  useEffect(() => {
    fetchData();
  }, [update]);


  const value = useMemo(() => ({ auth, update, setUpdate}), [auth, update]);

  return (
    <AuthentificationContext.Provider value={value}>
      {children}
    </AuthentificationContext.Provider>
  );
}

AuthentificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthentificationProvider, AuthentificationContext };
