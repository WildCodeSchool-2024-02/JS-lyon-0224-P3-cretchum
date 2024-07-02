import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/home_page/HomePage";
import StructureForm from "./pages/structure_form/StructureForm";
import ConnexionPage from "./pages/Connexion_page/ConnexionPage";
import SignUp from "./pages/sign_up/SignUp";
import SearchPage from "./pages/search_page/SearchPage";
import HomeStructureDetails from "./pages/home_structure_details/HomeStructureDetails";
import ProfilePage from "./pages/profile_page/ProfilePage";
import NotFoundPage from "./pages/not_found_page/NotFoundPage";

import structureFormAction from "./handlers/actions/structure_form_action/structureFormAction";
import AnimalsForm from "./pages/animals_form_page/AnimalsForm";
import connexionAction from "./handlers/actions/connexion_action/connexionAction";
import signUpAction from "./handlers/actions/sign_up_action/signUpAction";
import profileLoader from "./handlers/loader/profile_loader/profileLoader";
import homeStructureLoader from "./handlers/loader/home_structure_loader/homeStructureLoader";
import animalsFormAction from "./handlers/actions/animals_form_actions/animalsFormActions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/inscription_accueil/:id",
        element: <StructureForm />,
        action: structureFormAction,
      },
      {
        path: "/connexion",
        element: <ConnexionPage />,
        action: connexionAction,
      },
      {
        path: "/formulaire-animal/:id",
        element: <AnimalsForm />,
        action: animalsFormAction,
      },
      {
        path: "/inscription",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "/page-recherche",
        element: <SearchPage />,
      },
      {
        path: "/profil/:id",
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: "/reservation/:id",
        element: <HomeStructureDetails />,
        loader: homeStructureLoader,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
