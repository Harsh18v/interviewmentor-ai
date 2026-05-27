import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
    const { loading, user } = useAuth()

    if (loading) {
        return (
            <div className='w-full h-screen bg-black flex flex-col items-center justify-center gap-4'>

                <div className='w-8 h-8 rounded-full border-2 border-neutral-700 border-t-white animate-spin'></div>

                <p className='text-sm text-white tracking-widest uppercase'>
                    Loading
                </p>

            </div>
        )
    }

    if (!user) {
        return <Navigate to={"/login"} />
    }

    return children
}

export default Protected
