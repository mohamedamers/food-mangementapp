// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './shared/components/AuthLayout/AuthLayout'
import MasterLayout from './shared/components/MasterLayout/MasterLayout'
import DashbourdModule from './AuthModule/components/DashbourdModule/DashbourdModule'
import RecipesList from './RecipeModule/components/RecipesList/RecipesList'
import RecipesData from './RecipeModule/components/RecipeData/RecipeData'
import CategoriesList from './CategoreiesModule/components/CategoriesList/CategoriesList'
import CategoryData from './CategoreiesModule/components/CategoryData/CategoryData'
import UsersList from './UsersModule/components/UsersList/UsersList'
import NotFound from './shared/components/NotFound/NotFound'
import Login from './AuthModule/components/Login/login'
import Register from './AuthModule/components/Register/Register'
import ForgetPass from './AuthModule/components/ForgetPass/ForgetPass'
import ResetPass from './AuthModule/components/ResetPass/ResetPass'
import VerifyAcount from './AuthModule/components/VerifyAcount/VerifyAcount'
import { ToastContainer } from 'react-toastify'

function App() {
  const routes = createBrowserRouter([
    {path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<Login/>},
        {path:'login',element:<Login/>},
        {path:'register',element:<Register/>},
        {path:'forget-pass',element:<ForgetPass/>},
        {path:'reset-pass',element:<ResetPass/>},
        {path:'verify-account',element:<VerifyAcount/>},
      ]
    },
    {
      path:'dashboard',
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<DashbourdModule/>},
        {path:'recipes',element:<RecipesList />},
        {path:'recipe-data',element:<RecipesData/>},
        {path:'categories',element:<CategoriesList/>},
        {path:'category-data',element:<CategoryData/>},
        {path:'users',element:<UsersList/>},
      ]
    }
  ])
  return (
    <>
<RouterProvider router={routes}></RouterProvider>
<ToastContainer/>
    </>
  )
}

export default App
