import React from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HomePage = () => {


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-950 text-white p-4 pt-10 pb-8 flex flex-col items-center">

                <div className="text-center max-w-3xl mb-16">
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight select-none">
                        Boost your interview preparation <br />with AI guidance
                    </h2>
                    <p className="text-gray-400 mt-4 select-none">
                        Get personalized interview questions, skill gap analysis, and a complete strategy based on your resume and job description.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link to={"/register"}>
                            <button
                                className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold">
                                Get Started
                            </button>
                        </Link>

                        <Link to={"/learnmore"}>
                            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold">
                                Learn More
                            </button>
                        </Link>

                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mb-16 select-none">
                    <div className="bg-gray-900 p-6 rounded-xl text-center">
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Smart Questions</h3>
                        <p className="text-gray-400 text-sm">
                            AI generates technical & behavioral questions tailored to your job role.
                        </p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl text-center">
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Skill Gap Analysis</h3>
                        <p className="text-gray-400 text-sm">
                            Identify skill gaps and improve your chances of selection.
                        </p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl text-center">
                        <h3 className="text-lg font-semibold text-blue-400 mb-2">Personal Strategy</h3>
                        <p className="text-gray-400 text-sm">
                            Get a step-by-step plan to crack interviews with confidence.
                        </p>
                    </div>
                </div>

                <div className="text-center bg-gray-900 px-8 py-10 mb-8 rounded-2xl max-w-3xl w-full">
                    <h2 className="text-2xl font-bold mb-3">
                        Ready to Boost Your Interview Success?
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Let InterviewMentor AI guide you to your dream job.
                    </p>
                    <Link to={"/register"}>
                        <button onClick={() => { window.scrollTo(0, 0) }}
                            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold">
                            Generate Your Plan
                        </button>
                    </Link>

                </div>

                <Footer />

            </div >
        </>
    )
}

export default HomePage
