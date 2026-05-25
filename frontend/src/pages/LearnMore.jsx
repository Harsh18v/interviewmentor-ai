import React from 'react'
import { Link } from 'react-router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const LearnMore = () => {
    return (
        <>
            <Navbar />
            
            <div className="min-h-screen bg-gray-950 text-white p-4 pt-10 pb-8 flex flex-col items-center">

                <div className="max-w-4xl text-center mb-12">
                    <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
                        What is <span className="text-blue-400">InterviewMentor AI</span>?
                    </h1>
                    <p className="text-sm md:text-xl text-gray-400 mt-4">
                        InterviewMentor AI helps you prepare smarter by generating personalized interview questions,
                        identifying your skill gaps, and creating a strategy based on your profile and job role.
                    </p>
                </div>

                <div className="max-w-5xl w-full mb-16">
                    <h2 className="text-2xl font-semibold mb-6 text-blue-400 text-center">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 text-center">

                        <div className="bg-gray-900 p-5 rounded-xl">
                            <h3 className="font-semibold mb-2">1. Add Details</h3>
                            <p className="text-sm text-gray-400">
                                Upload your resume or write your profile summary.
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

                <div className="max-w-4xl text-center mb-16">
                    <h2 className="text-2xl font-semibold text-blue-400 mb-4">
                        Who Is This For?
                    </h2>
                    <p className="text-gray-400">
                        Perfect for students, freshers, and professionals who want structured and personalized
                        interview preparation instead of generic practice questions.
                    </p>
                </div>

                <div className="bg-gray-900 px-8 py-10 rounded-2xl text-center max-w-3xl w-full">
                    <h2 className="text-2xl font-bold mb-3">
                        Start Preparing Smarter
                    </h2>
                    <p className="text-gray-400 mb-6">
                        Let InterviewMentor AI guide your interview journey.
                    </p>
                    <Link to={"/register"}>
                        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg font-semibold">
                            Get Started
                        </button>
                    </Link>

                </div>

                <Footer />

            </div>
        </>
    )
}

export default LearnMore
