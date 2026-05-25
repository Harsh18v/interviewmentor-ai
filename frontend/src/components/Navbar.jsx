import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
    return (
        <div className="w-full max-h-30 bg-gray-900 flex justify-between items-center p-8 text-white">

            <div className='flex justify-center items-center gap-2'>
                <img src="/logo.png" alt="logo" className='w-10' />
                <h1 className="text-sm md:text-xl lg:text-2xl font-bold select-none">InterviewMentor
                    <span className='text-blue-400'> AI</span>
                </h1>
            </div>

            <div className="flex gap-3">
                <Link to={"/login"}>
                    <button className="bg-gray-800 hover:bg-gray-700 px-2 py-2 md:px-4 rounded-lg text-sm font-semibold">
                        Login
                    </button>
                </Link>
                <Link to={"/register"}>
                    <button className="bg-blue-500 hover:bg-blue-600 px-2 py-2 md:px-4 rounded-lg text-sm font-semibold">
                        Register
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
