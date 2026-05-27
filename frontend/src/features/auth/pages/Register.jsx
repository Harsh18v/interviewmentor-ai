import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()


    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await handleRegister({ name, username, email, password })
            if (data?.user) {
                alert('User registered successfully')
                navigate('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

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
            <div className=' min-h-screen flex flex-col md:flex-row'>

                <div className='left-side w-full md:w-1/2 h-auto md:h-screen flex flex-col justify-center bg-black text-[#f8f6f1] py-12 md:py-0 px-12 md:px-16'>

                    <div className='flex items-center gap-2 mb-16'>
                        <span className='font-semibold tracking-widest uppercase text-[#94a3b8]'>
                            InterviewMentor AI
                        </span>
                    </div>

                    <div className='max-w-md'>
                        <h1 className='text-4xl md:text-5xl font-bold leading-tight text-[#f8f6f1] mb-4'>
                            Ace your next interview with AI
                        </h1>

                        <p className='text-lg text-[#94a3b8]'>
                            Upload your resume and job description. Get personalized questions,
                            skill gap analysis, and a step-by-step study plan — in seconds.
                        </p>
                    </div>

                    <div className='mt-16 flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse'></div>
                        <span className='text-sm text-[#94a3b8] tracking-wide'>
                            Powered by Gemini AI
                        </span>
                    </div>

                </div>

                <div className='right-side w-full md:w-1/2 min-h-screen bg-[#f4f2f2] flex items-center justify-center py-10 px-6 md:px-16'>

                    <div className='w-full max-w-sm'>

                        <div className='mb-8'>
                            <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-black mb-2'>
                                Create account
                            </h1>
                            <p className='text-sm text-neutral-500'>Start your interview prep today</p>
                        </div>

                        <form onSubmit={handleSubmit} className='w-full'>
                            <div className='mb-5'>
                                <label className=' text-neutral-700 mb-2'>
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder='Harsh Sharma'
                                    className='w-full h-10 bg-white border border-neutral-200 rounded-lg px-4 text-sm text-black placeholder-neutral-400 outline-none focus:border-black transition-colors duration-200'
                                />
                            </div>
                            <div className='mb-5'>
                                <label className=' text-neutral-700 mb-2'>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='harsh_dev'
                                    className='w-full h-10 bg-white border border-neutral-200 rounded-lg px-4 text-sm text-black placeholder-neutral-400 outline-none focus:border-black transition-colors duration-200'
                                />
                            </div>
                            <div className='mb-5'>
                                <label className=' text-neutral-700 mb-2'>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='you@example.com'
                                    className='w-full h-10 bg-white border border-neutral-200 rounded-lg px-4 text-sm text-black placeholder-neutral-400 outline-none focus:border-black transition-colors duration-200'
                                />
                            </div>
                            <div className='mb-2'>
                                <label className=' text-neutral-700 mb-2'>
                                    Password
                                </label>
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='••••••••'
                                    className='w-full h-10 bg-white border border-neutral-200 rounded-lg px-4 text-sm text-black placeholder-neutral-400 outline-none focus:border-black transition-colors duration-200'
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full mt-6 bg-black hover:bg-neutral-800  text-white h-11 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200'>
                                Create account
                            </button>
                        </form>

                        <p className='mt-6 text-center text-neutral-600'>
                            Already have an account?{' '}
                            <Link to="/login" className='text-black font-semibold hover:underline'>
                                Sign in
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Register



