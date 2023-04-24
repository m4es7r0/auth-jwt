import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import SignIn from "./components/SignInForm/SignInForm.tsx";

import SignUp from "./components/SignUpForm/SignUpForm.tsx";
import "./index.css";
import store from "./store/store.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
