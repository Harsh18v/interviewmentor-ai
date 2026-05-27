import { useState, useRef, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth.js'

const Generate = () => {

    const { handleLogout, user } = useAuth()
    const { loading, generateReport, reports, getReports } = useInterview()
    const [selfDescription, setSelfDescription] = useState("")
    const [jobDescription, setJobDescription] = useState("")
    const [error, setError] = useState("")
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        setError("")
        const resumeFile = resumeInputRef.current?.files?.[0]

        if (!resumeFile) {
            setError("Please upload your resume before generating a report.")
            return
        }
        if (!jobDescription.trim()) {
            setError("Please enter the job description.")
            return
        }
        if (!selfDescription.trim()) {
            setError("Please describe yourself before generating a report.")
            return
        }

        try {
            const data = await generateReport({ resumeFile, jobDescription, selfDescription })
            const id = data?._id ?? data?.interviewReport?._id
            if (!id) {
                console.error('No report ID returned from generateReport', data)
                setError('Server did not return a report ID. Please try again.')
                return
            }
            navigate(`/report/${id}`)
        } catch (err) {
            console.error(err)
            const serverMessage = "Failed to generate report. Please try again."
            setError(serverMessage)
        }
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
            <div className='w-full h-screen bg-black flex flex-col items-center justify-center gap-4'>

                <div className='w-8 h-8 rounded-full border-2 border-neutral-700 border-t-white animate-spin'></div>

                <p className='text-sm text-white tracking-widest uppercase'>
                    Loading
                </p>

            </div>
        )
    }

    return (
        <>
            <div className='bg-black w-full h-full flex flex-col justify-center items-center text-white'>

                <nav className='w-full bg-[#0d0d0d] border-b border-neutral-800 px-4 md:px-8 py-4 flex flex-wrap gap-4 items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <span className='font-semibold tracking-widest uppercase text-neutral-400 text-sm md:text-sm'>
                            InterviewMentor AI
                        </span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <span className='text-sm text-neutral-400'>
                            {user.name}
                        </span>
                        <button
                            onClick={handleUserLogout}
                            className='text-sm md:text-sm text-neutral-400 hover:text-white border border-neutral-700 hover:border-neutral-500 px-3 md:px-4 py-1.5 rounded-lg transition-all duration-200'>
                            Logout
                        </button>
                    </div>
                </nav>

                <div className='w-full max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-16'>

                    <div className='mb-8 md:mb-12'>
                        <h1 className='text-2xl md:text-4xl font-bold text-white mb-2 md:mb-3'>
                            Build your interview plan
                        </h1>
                        <p className='text-sm md:text-md text-neutral-500'>
                            Paste the job description and upload your resume.
                        </p>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm  text-white'>
                                Target Job Description
                            </label>
                            <textarea
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder='Paste the full job description here...'
                                maxLength={5000}
                                className='w-full h-64 bg-neutral-900 rounded px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none resize-none transition-colors duration-200'
                            />
                            <span className='text-sm text-neutral-500 text-right'>
                                {jobDescription.length}/5000
                            </span>
                        </div>

                        <div className='flex flex-col gap-4'>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-white'>
                                    Your Resume
                                </label>
                                <label className='w-full h-24 bg-neutral-900 rounded flex flex-col items-center justify-center cursor-pointer transition-colors duration-200'>
                                    <span className='text-sm text-neutral-500 hover:text-neutral-300 transition-colors'>
                                        {resumeInputRef.current?.files?.[0]?.name || 'Click to upload PDF'}
                                    </span>
                                    {!resumeInputRef.current?.files?.[0] && (
                                        <span className='text-sm text-neutral-600 mt-2'>PDF only</span>
                                    )}
                                    <input
                                        ref={resumeInputRef}
                                        type="file"
                                        accept='.pdf'
                                        className='hidden'
                                    />
                                </label>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <label className='text-sm font-medium text-white'>
                                    Anything else we should know?
                                </label>
                                <textarea
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    placeholder='e.g. I have 1 year of internship experience in React...'
                                    className='w-full h-28 bg-neutral-900 rounded px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none resize-none transition-colors duration-200'
                                />
                            </div>

                        </div>
                    </div>

                    <div className='flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mt-6 md:mt-8'>
                        <div className='flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse'></div>
                            <span className='text-sm text-neutral-600'>30 sec generation</span>

                        </div>

                        <button
                            onClick={handleGenerateReport}
                            disabled={loading}
                            className='bg-white hover:bg-neutral-200  text-black px-8 h-10 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed'>
                            Generate
                        </button>
                    </div>
                    {error && <p className='text-red-400 text-sm mt-4'>{error}</p>}

                </div>

                {reports.length > 0 && (
                    <div className='w-full max-w-5xl mx-auto px-4 md:px-6 pb-8 md:pb-16'>

                        <div className='border-t border-neutral-800 pt-12'>
                            <h2 className='text-md font-medium text-neutral-500 uppercase tracking-widest mb-6'>
                                Recent Reports
                            </h2>

                            <div className='flex flex-col gap-3'>
                                {reports.map(report => (
                                    <div
                                        key={report._id}
                                        onClick={() => navigate(`/report/${report._id}`, { replace: true })}
                                        className='flex items-center justify-between bg-neutral-900 hover:bg-neutral-800 rounded-xl px-5 py-4 cursor-pointer transition-all duration-200'>

                                        <div>
                                            <h3 className='text-md font-medium text-white'>
                                                {report.title}
                                            </h3>
                                            <p className='text-md text-neutral-500 mt-2'>
                                                {new Date(report.createdAt).toLocaleDateString('en-IN', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>

                                        <span className='text-neutral-400'>
                                            →
                                        </span>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                )}
            </div >
        </>
    )
}


export default Generate
