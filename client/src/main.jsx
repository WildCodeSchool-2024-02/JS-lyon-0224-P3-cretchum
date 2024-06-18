import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import App from "./App";
import HomePage from "./pages/home_page/HomePage";

import StructureForm from "./pages/structure_form/StructureForm";
import ConnexionPage from "./pages/Connexion_page/ConnexionPage";
import SignIn from "./pages/signin/SignIn";
import SearchPage from "./pages/search-page/SearchPage";

const URL = import.meta.env.VITE_API_URL;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/inscription_accueil/:id", element: <StructureForm /> },
      {
        path: "/connexion",
        element: <ConnexionPage />,
        action: async ({ request }) => {
          try {
            const formData = await request.formData();
            const mail = formData.get("mail");
            const password = formData.get("password");

            const response = await fetch(`${URL}/users/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ mail, password }),
            });

            if (response.status === 200) {
              return redirect("/page-recherche");
            }
            return { error: "mail ou mot de passe incorrect" };
          } catch (err) {
            console.error("Login error:", err);
            return {
              error: "An error occurred during login. Please try again later.",
            };
          }
        },
      },
      {
        path: "/inscription",
        element: <SignIn />,
        action: async ({ request }) => {
          try {
            const formData = await request.formData();

            const lastname = formData.get("lastname");
            const firstname = formData.get("firstname");
            const username = formData.get("username");
            const phoneNumber = formData.get("phone_number");
            const location = formData.get("location");
            const mail = formData.get("mail");
            const password = formData.get("password");
            const description = formData.get("description");

            const buttonValue = formData.get("submitButton");

            const response = await fetch(`${URL}/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                lastname,
                firstname,
                username,
                phoneNumber,
                location,
                mail,
                password,
                description,
              }),
            });

            if (!response.ok) {
              throw new Error("");
            }

            if (buttonValue === "structure") {
              const newdata = await response.json();
              const userId = newdata.insertId;
              return redirect(`/inscription_accueil/${userId}`);
            }
            return redirect("/page-recherche");
          } catch (err) {
            console.error("Fetch error:", err);
            return null;
          }
        },
      },
      {
        path: "/page-recherche",
        element: <SearchPage />,
        loader: async () => {
          const response = await fetch(`${URL}/homestructure`);
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
