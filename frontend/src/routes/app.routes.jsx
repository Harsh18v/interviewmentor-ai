import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";
import Generate from "../features/interview/pages/Generate";
import HomePage from "../pages/HomePage";
import LearnMore from "../pages/LearnMore";
import Report from "../features/interview/pages/Report"
import NotFound from "../pages/NotFound"



export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/generate",
        element: <Protected> <Generate /> </Protected>
    },
    {
        path: "/home",
        element: <HomePage />
    },
    {
        path: "/learnmore",
        element: <LearnMore />
    },
    {
        path: "/report/:interviewId",
        element: <Protected><Report /></Protected>
    },
    {
        path: "*",
        element: <NotFound />
    }
])

