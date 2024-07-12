import "./App.css";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavMenu from "./components/nav_menu/NavMenu";
import { AuthentificationProvider } from "./use_context/authentification";

function App() {
  const location = useLocation();
  const formAnimal = (useMatch("/formulaire-animal/:id"))
  const noNavBar = [`/inscription_accueil/:id`, `/formulaire-animal/${formAnimal.params.id}`, "/inscription", "/", "/connexion" ];

  return (
    <> 
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <AuthentificationProvider>
      {noNavBar.includes(location.pathname) === false && <NavMenu /> }
        <Outlet />
      </AuthentificationProvider>
    </>
  );
}

export default App;
