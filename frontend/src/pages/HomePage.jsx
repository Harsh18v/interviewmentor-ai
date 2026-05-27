import React from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HomePage = () => {


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-950 text-white p-4 pt-10 pb-8 flex flex-col items-center">

                <div className="text-center max-w-3xl mt-8 mb-12">
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight select-none">
                        Boost your interview preparation <br />with AI guidance
                    </h2>
                    <p className="text-gray-400 mt-4 select-none">
                        Get personalized interview questions, skill gap and study plan based on your resume and job description.
                    </p>
                    <div className="mt-6 flex justify-center gap-4">
                        <Link to={"/register"}>
                            <button
                                className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold">
                                Get Started
                            </button>
                        </Link>


                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-8 mb-14  select-none">
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

                <div className="max-w-5xl w-full mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-400 text-center">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 text-center">

                        <div className="bg-gray-900 p-5 rounded-xl">
                            <h3 className="font-semibold mb-2">1. Add Details</h3>
                            <p className="text-sm text-gray-400">
                                Upload your resume and write your profile summary.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-5 rounded-xl">
                            <h3 className="font-semibold mb-2">2. Paste Job Role</h3>
                            <p className="text-sm text-gray-400">
                                Enter the job description you are targeting.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-5 rounded-xl">
                            <h3 className="font-semibold mb-2">3. AI Analysis</h3>
                            <p className="text-sm text-gray-400">
                                AI compares your profile with job requirements.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-5 rounded-xl">
                            <h3 className="font-semibold mb-2">4. Get Results</h3>
                            <p className="text-sm text-gray-400">
                                Receive questions, skill gaps, and strategy instantly.
                            </p>
                        </div>

                    </div>
                </div>



                <div className="max-w-5xl w-full mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-400 text-center">
                        What You Get
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="font-semibold text-blue-400 mb-2">Smart Questions</h3>
                            <p className="text-gray-400 text-sm">
                                Get technical and behavioral questions tailored to your job role.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="font-semibold text-blue-400 mb-2">Skill Gap Analysis</h3>
                            <p className="text-gray-400 text-sm">
                                Identify what skills you are missing for the role.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="font-semibold text-blue-400 mb-2">Personal Strategy</h3>
                            <p className="text-gray-400 text-sm">
                                Get a clear roadmap to improve and crack the interview.
                            </p>
                        </div>

                        <div className="bg-gray-900 p-6 rounded-xl">
                            <h3 className="font-semibold text-blue-400 mb-2">Time Saving</h3>
                            <p className="text-gray-400 text-sm">
                                No need to search randomly — everything is generated for you.
                            </p>
                        </div>

                    </div>
                </div>

                <Footer />

            </div >
        </>
    )
}

export default HomePage
