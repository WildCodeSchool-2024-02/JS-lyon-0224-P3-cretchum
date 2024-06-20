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
import SingIn from "./pages/signin/SignIn";
import SearchPage from "./pages/search-page/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/structure-form",
        element: <StructureForm />,
        action: async ({ request }) => {
          try {
            const formData = await request.formData();

            const isProfessional = formData.get("isProfessional");
            const name = formData.get("name");
            const lastname = formData.get("lastname");
            const firstname = formData.get("firstname");
            const phoneNumber = formData.get("phonenumber");
            const postalCode = formData.get("postal_code");
            const location = formData.get("location");
            const mail = formData.get("mail");
            const capacity = formData.get("capacity");
            const price = formData.get("price");
            const cat = formData.get("cat");
            const dog = formData.get("dog");
            const password = formData.get("password");
            const description = formData.get("description");
            const response = await fetch(
              `http://localhost:3310/api/homestructure`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  isProfessional,
                  name,
                  lastname,
                  firstname,
                  phoneNumber,
                  postalCode,
                  location,
                  mail,
                  capacity,
                  price,
                  cat,
                  dog,
                  password,
                  description,
                }),
              }
            );

            if (!response.ok) {
              throw new Error("");
            }
          } catch (err) {
            console.error("Fetch error:", err);
            return null;
          }
          return redirect("/page-recherche");
        },
      },

      {
        path: "/connexion",
        element: <ConnexionPage />,
        action: async ({ request }) => {
          try {
            const formData = await request.formData();
            const mail = formData.get("mail");
            const password = formData.get("password");

            const response = await fetch(
              `http://localhost:3310/api/users/login`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ mail, password }),
              }
            );

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
        element: <SingIn />,
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

            const response = await fetch(`http://localhost:3310/api/users`, {
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
          } catch (err) {
            console.error("Fetch error:", err);
            return null;
          }
          return redirect("/page-recherche");
        },
      },
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
