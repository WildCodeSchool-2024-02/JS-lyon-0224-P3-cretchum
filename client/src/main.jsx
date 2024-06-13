import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

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
        action: async ({ request }) => {
          try {
            const formData = await request.formData();
            const mail = formData.get("mail");
            const password = formData.get("password");

            const response = await fetch(`http://localhost:3310/api/users/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ mail, password }),
            });

            if (response.status === 200) {
              return redirect("/page-recherche");
            }
            return null
          } catch (err) {
            return err;
          }
        },
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
