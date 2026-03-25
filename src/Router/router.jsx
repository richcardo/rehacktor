import { Component } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import Homepage from "../Pages/Hompege";
import routes  from "./routes";
import { getAllGamesLoader } from "./Loaders";

const router = createBrowserRouter([
  {
    path : routes.home,
    Component : Layout,
    children :  [ 
      {
        path: routes.home,
        Component: Homepage,
        loader: getAllGamesLoader
      }
    ]
  }

])

export default router;