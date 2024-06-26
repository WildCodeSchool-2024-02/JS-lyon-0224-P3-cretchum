import { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

const URL = import.meta.env.VITE_API_URL;

const AuthentificationContext = createContext();

function AuthentificationProvider({ children }) {
  const [auth, setAuth] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/auth`, {
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        setAuth(data);
      } else if (response.status === 401) {
        setAuth(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const value = useMemo(() => ({ auth }), [auth]);

  return (
    <AuthentificationContext.Provider value={value}>
      {children}
    </AuthentificationContext.Provider>
  );
}

AuthentificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthentificationProvider, AuthentificationContext,  };
