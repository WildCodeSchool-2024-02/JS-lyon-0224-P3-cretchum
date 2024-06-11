import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import HomePage from "./pages/home_page/HomePage";
import SingIn from "./pages/signin/SignIn";
import SearchPage from "./pages/search-page/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/inscription", element: <SingIn /> },
      {
        path: "/page-recherche",
        element: <SearchPage />,
        loader: async () => {
          const response = await fetch(
            "http://localhost:3310/api/homestructure"
          );
          const data = await response.json();
          return data;
        },
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
