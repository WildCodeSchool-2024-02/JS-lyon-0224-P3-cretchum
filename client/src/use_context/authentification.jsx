import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const authentification = createContext();

function AuthentificationProvider({ children }) {
  const [auth, setAuth] = useState();


  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return (
    <authentification.Provider value={value}>
      {children }
    </authentification.Provider>
  );
}

export { AuthentificationProvider, authentification };

AuthentificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
