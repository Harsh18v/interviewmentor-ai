import React from 'react'
import { Link } from 'react-router'

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 px-6 py-10 border-t border-gray-700">

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                <div>
                    <h2 className="text-white text-lg font-semibold mb-3">
                        InterviewMentor <span className="text-blue-400">AI</span>
                    </h2>
                    <p className="text-sm">
                        Prepare smarter with AI-powered interview guidance, personalized questions,
                        and skill gap analysis.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm flex flex-col">
                        <span>
                            <Link to={"/"} onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 cursor-pointer">Home</Link>
                        </span>
                        <span>
                            <Link to={"/learnmore"} onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 cursor-pointer">Learn more</Link>
                        </span>
                        <span>
                            <Link to={"/login"} onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 cursor-pointer">Login</Link>
                        </span>
                        <span>
                            <Link to={"/register"} onClick={() => window.scrollTo(0, 0)} className="hover:text-blue-400 cursor-pointer">Register</Link>
                        </span>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-3">Contact</h3>
                    <p className="text-sm">harsh17v@gmail.com</p>
                    <p className="text-sm mt-2">Built for students & developers</p>
                </div>

            </div>


        </footer>

    )
}

export default Footer
