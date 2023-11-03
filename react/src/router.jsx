/* eslint-disable no-unused-vars */
import {createBrowserRouter} from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import GuestLayout from "./layouts/GuestLayout"

import Landing from './pages/guest/Landing'
import Singup from './pages/guest/Singup'
import Login from './pages/guest/Login'

import Admin from './pages/Admin'
import User from './pages/User'
import AllSurveys from "./pages/AllSurveys"

const router = createBrowserRouter([
    {
        path:'/',
        element: <GuestLayout/>,
        children: [
            {path:'/' , element: <Landing/>},
            {path:'/singup' , element: <Singup/>},
            {path:'/login', element: <Login/>},
            {path:'*' , element: <h1>Ne postoji</h1>}
        ]
    },

    {
        path:'/auth',
        element: <AuthLayout/>,
        children: [
            {path:'dashboard', element: <User/>},
            {path:'surveys', element: <AllSurveys/>},
            // {path:'admin', element: <Admin/>},
            {path:'*' , element: <h1>Ne postoji</h1>}
        ]
    }
]);

export default router;