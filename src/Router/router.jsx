import { Component } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import Homepage from "../Pages/Hompege";
import routes from "./routes";
import { getAllGamesLoader, getAllGenres, getFilteredBuGenreGames } from "./loaders";
import { getSearchedGames } from "./loaders";
import SearchPage from "../Pages/SearchPage";
import GenrePage from "../Pages/GenrePage";

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Layout,
    loader: getAllGenres,
    children: [
      {
        path: routes.home,
        Component: Homepage,
        loader: getAllGamesLoader,
      },
      {
        path: routes.search,
        Component: SearchPage,
        loader: getSearchedGames,
      },
      {
        path : routes.genre,
        Component : GenrePage,
        loader : getFilteredBuGenreGames,
      }
    ],
  },
]);

export default router;
