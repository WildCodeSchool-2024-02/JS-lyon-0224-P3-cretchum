import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

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
