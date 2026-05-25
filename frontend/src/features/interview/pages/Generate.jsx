import Footer from '../../../components/Footer'
import { useState, useRef, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth.js'

const Generate = () => {

    const { handleLogout, user } = useAuth()
    const { loading, generateReport, reports, getReports } = useInterview()
    const [selfDescription, setSelfDescription] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ resumeFile, jobDescription, selfDescription })
        navigate(`/report/${data._id}`)
    }

    const handleUserLogout = async () => {
        handleLogout()
        navigate('/')
    }

    useEffect(() => {
        getReports()
    }, [])

    if (loading) {
        return (
            < div className='w-full h-screen bg-gray-900 flex justify-center items-center text-white text-3xl' >
                <h1>Loading.....</h1>
            </div >
        )
    }

    return (
        <>
            <div className='bg-gray-950 w-full h-full flex flex-col justify-center items-center text-white'>

                <div className="w-full bg-gray-900 flex justify-around items-center p-4 text-white">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="logo" className="w-8 md:w-10" />
                        <h1 className="text-lg md:text-xl font-bold">
                            InterviewMentor <span className="text-blue-400">AI</span>
                        </h1>
                    </div>
                    <div className='flex gap-4 justify-center items-center'>
                        <button onClick={handleUserLogout}
                            className='bg-red-600 hover:bg-red-500 px-2 py-2 md:px-4 rounded-lg text-sm font-semibold'>
                            Logout
                        </button>
                        <span>{user.name}</span>
                    </div>
                </div>

                <div className="w-[90%] md:w-[70%] lg:w-[60%] min-h-[60vh] bg-gray-900 rounded-2xl mt-12 p-6 mb-16 shadow-lg">

                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">
                            Create Your Custom
                            <span className="text-blue-400"> Interview Plan</span>
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">
                            Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                        </p>
                    </div>

                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className=" bg-gray-950 rounded-lg p-4 flex flex-col">
                            <div className="flex justify-between mb-2">
                                <h2 className="text-sm font-semibold">Target Job Description</h2>
                                <span className="text-xs text-blue-400">REQUIRED</span>
                            </div>
                            <textarea onChange={(e) => { setJobDescription(e.target.value) }}
                                className=" flex-1 bg-gray-900 rounded p-2 text-sm text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Paste job description..."
                            />
                            <p className="text-xs text-gray-500 text-right mt-1">0/5000</p>
                        </div>
                        <div className="bg-gray-950 rounded-lg p-4 flex flex-col gap-3">
                            <h2 className="text-sm font-semibold">Your Profile</h2>
                            <div>
                                <input ref={resumeInputRef}
                                    type="file"
                                    className='w-full  bg-gray-900 rounded p-4 text-center text-gray-400 text-sm hover:bg-gray-800 transition' />
                            </div>
                            <div className="text-center text-xs text-gray-500">And</div>
                            <textarea onChange={(e) => { setSelfDescription(e.target.value) }}
                                className="bg-gray-900 rounded p-2 text-sm text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                                placeholder="Describe yourself..."
                            />
                            <div className="text-xs bg-blue-900/30 p-2 rounded text-blue-300">
                                Resume and description required
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                        <p className="text-xs text-gray-500">~30 sec generation</p>
                        <button onClick={handleGenerateReport}
                            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-sm font-semibold">
                            Generate
                        </button>
                    </div>

                </div>

                <div>

                    {reports.length > 0 && (
                        <section className='bg-gray-900 min-w-full md:w-[80%] lg:w-[70%] min-h-[20vh] p-4 mb-16 rounded'>
                            <h3 className='text-lg font-bold'>Recently generated reports</h3>
                            <ul className=''>
                                {reports.map(report => (
                                    <li onClick={() => { navigate(`/report/${report._id}`) }}
                                        className='bg-gray-800 flex flex-col gap-4 p-4 m-4 rounded cursor-pointer'
                                        key={report._id}>
                                        <h3>{report.title}</h3>
                                        <p className='text-blue-500'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                <Footer />
            </div >
        </>
    )
}


export default Generate
