import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import notify from "./utils/notify"
import App from "./App";
import HomePage from "./pages/home_page/HomePage";

import StructureForm from "./pages/structure_form/StructureForm";
import ConnexionPage from "./pages/Connexion_page/ConnexionPage";
import SingIn from "./pages/signin/SignIn";
import SearchPage from "./pages/search-page/SearchPage";
import ProfilePage from "./pages/profile_page/ProfilePage";

const URL = import.meta.env.VITE_API_URL;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/structure-form", element: <StructureForm /> },
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
              notify("Connexion réussie !", "success");
              return redirect("/page-recherche");
            }
            notify("Email ou mot de passe incorrect !", "error");
            return { error: "incorrect mail or password" };
          } catch (err) {
            notify(
              "Une erreur est survenue lors de la connexion. Veuillez réessayer plus tard.", "error"
            );
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
            if (response.status === 201) {
              notify("Inscription réussie !", "success");
              return redirect("/page-recherche");
            }
            notify("Erreur lors de l'inscription !", "error");
            throw new Error("Registration error");
          } catch (err) {
            console.error("Fetch error:", err);
            notify("Une erreur est survenue lors de l'inscription. Veuillez réessayer plus tard.", "error");
            return { error: "An error occurred during registration. Please try again later." };
          }
        },
      },
      {
        path: "/page-recherche",
        element: <SearchPage />,
      },
      {
        path: "/profile/:id",
        element: <ProfilePage />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`${URL}/users/${params.id}`);
            if (!response.ok === false) {
              notify("Erreur lors de la récupération des données du profil !", "error");
              throw new Error("Failed to fetch profile data");
            }
            const data = await response.json();
            notify("Les données du profil ont été récupérées avec succès.", "success");
            return data;
          } catch (err) {
            console.error("Fetch profile error:", err);
            notify(
              "Une erreur est survenue lors de la récupération des données du profil. Veuillez réessayer plus tard.",
              "error"
            );
            throw err;
          }
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