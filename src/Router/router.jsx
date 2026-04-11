import { Component } from "react";
import { createBrowserRouter } from "react-router";
import Layout from "../Layout/Layout";
import Homepage from "../Pages/Hompege";
import routes from "./routes";
import { getAllGamesLoader, getAllGenres, getFilteredBuGenreGames } from "./loaders";
import { getSearchedGames } from "./loaders";
import SearchPage from "../Pages/SearchPage";
import GenrePage from "../Pages/GenrePage";
import AuthLayout from "../Layout/AuthLayout";
import RegisterPage from "../Pages/Auth/RegisterPage";
import LoginPage from "../Pages/Auth/LoginPage"
import ProfilePage from "../Pages/ProfilePage"
import ProfileSettingsPage from "../Pages/ProfileSettingsPage"

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
   {
      path : "/auth",
      Component : AuthLayout,
      children : [
        {
          path : routes.register,
          Component : RegisterPage,
        },
        {
          path : routes.login,
          Component : LoginPage,
        },
        {
          path : routes.profile,
          Component : ProfilePage,
        },
        {
          path: routes.profile_settings,
          Component : ProfileSettingsPage
        }
      ]

    }
]);

export default router;
