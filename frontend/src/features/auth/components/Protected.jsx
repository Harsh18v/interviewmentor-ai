import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <div className='w-full h-screen bg-neutral-900 flex justify-center items-center text-white text-3xl'>
                <h1>Loading.....</h1>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }

    return children
}

export default Protected
