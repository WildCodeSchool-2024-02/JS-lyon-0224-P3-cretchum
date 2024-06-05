import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import SingIn from "./pages/signin/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "/signin", element: <SingIn /> }],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
