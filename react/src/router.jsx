/* eslint-disable no-unused-vars */
import {createBrowserRouter} from "react-router-dom"

import AuthLayout from "./layouts/AuthLayout"
import GuestLayout from "./layouts/GuestLayout"

import Landing from './pages/guest/Landing'
import Singup from './pages/guest/Singup'
import Login from './pages/guest/Login'

import Admin from './pages/Admin'
import Dashboard from './pages/Dashboard'
import CreateSurvey from "./pages/survey/CreateSurvey"
import SurveysUnactive from "./pages/survey/SurveysUnactive"
import SurveysActive from "./pages/survey/SurveysActive"
import OneSurvey from "./pages/survey/OneSurvey"
import SurveysFinished from "./pages/survey/SurveysFinished"
import SuggestionsAdmin from "./pages/suggestions/SuggestionsAdmin"
import SuggestionsStudent from "./pages/suggestions/SuggestionsStudent"
import AddStudent from "./pages/students/AddStudent"
import ShowStudents from "./pages/students/ShowStudents"
import UpdateSurvey from "./pages/survey/UpdateSurvey"
import ShowUserProfile from "./pages/profile/ShowUserProfile" 
import ShowUserSurveys from "./pages/profile/ShowUserSurveys"
import ShowAnswearsOfSurveys from "./pages/profile/ShowAnswearsOfSurveys"


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
                            {path:'dashboard', element: <Dashboard/>},
            {path:'create', element: <CreateSurvey/>},
            {path:'surveys-unactive', element: <SurveysUnactive/>},
            {path:'surveys-active', element: <SurveysActive/>},
            {path:'surveys-finished', element: <SurveysFinished/>},
            {path:'survey/:id', element: <OneSurvey/>},
            {path:'survey-update/:id', element: <UpdateSurvey/>},
            {path:'show-suggestions', element:<SuggestionsAdmin/>},
            {path:'add-suggestion', element:<SuggestionsStudent/>},
            {path:'show-students', element:<ShowStudents/>},
            {path:'add-students', element:<AddStudent/>},
            {path:'user-profile', element:<ShowUserProfile/>},
            {path:'user-surveys', element:<ShowUserSurveys/>}, 
            {path:'user-answers-surveys/:id', element:<ShowAnswearsOfSurveys/>}
            // {path:'admin', element: <Admin/>},
            // {path:'*' , element: <h1>Ne postoji</h1>}
        ]
    }
]);

export default router;