import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import DashbourdModule from "./AuthModule/components/DashbourdModule/DashbourdModule";
import ForgetPass from "./AuthModule/components/ForgetPass/ForgetPass";
import Login from "./AuthModule/components/Login/login";
import Register from "./AuthModule/components/Register/Register";
import ResetPass from "./AuthModule/components/ResetPass/ResetPass";
import VerifyAcount from "./AuthModule/components/VerifyAcount/VerifyAcount";
import CategoriesList from "./CategoreiesModule/components/CategoriesList/CategoriesList";
import CategoryData from "./CategoreiesModule/components/CategoryData/CategoryData";
import RecipesData from "./RecipeModule/components/RecipeData/RecipeData";
import RecipesList from "./RecipeModule/components/RecipesList/RecipesList";
import UsersList from "./UsersModule/components/UsersList/UsersList";
import AuthLayout from "./shared/components/AuthLayout/AuthLayout";
import MasterLayout from "./shared/components/MasterLayout/MasterLayout";
import NotFound from "./shared/components/NotFound/NotFound";
import ProtectedRoute from "./shared/components/ProtectedRoute/ProtectedRoute";
import FavList from "./AuthModule/components/Favorites/components/FavList/FavList";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAcount /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <DashbourdModule /> },
        { path: "recipes", element: <RecipesList /> },
        { path: "recipe-data", element: <RecipesData /> },
        { path: "recipe-data/:id", element: <RecipesData /> },
        { path: "categories", element: <CategoriesList /> },
        { path: "category-data", element: <CategoryData /> },
        { path: "users", element: <UsersList /> },
        {path: "favs", element: <FavList />}
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
