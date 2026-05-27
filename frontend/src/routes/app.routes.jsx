import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";
import Generate from "../features/interview/pages/Generate";
import Report from "../features/interview/pages/Report"
import NotFound from "../pages/NotFound"



export const router = createBrowserRouter([
    {
        path: "/",
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
        path: "/report/:interviewId",
        element: <Protected><Report /></Protected>
    },
    {
        path: "*",
        element: <NotFound />
    }
])

