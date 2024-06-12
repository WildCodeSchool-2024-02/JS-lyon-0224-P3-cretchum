import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider, redirect, } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/home_page/HomePage";
import ConnexionPage from "./pages/Connexion_page/ConnexionPage";
import SingIn from "./pages/signin/SignIn";
import SearchPage from "./pages/search-page/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/connexion",
        element: <ConnexionPage />,
        action: async () => redirect("/page-recherche"),
      },
      { path: "/inscription", element: <SingIn /> },
      { path: "/page-recherche", element: <SearchPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
