import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const { loading, handleLogin, user } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await handleLogin({ email, password })
            if (data?.user) {
                navigate('/generate')
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

                <div className='left-side w-full md:w-1/2 h-auto md:h-screen flex flex-col justify-center bg-black text-white py-12 md:py-0 px-12 md:px-16'>

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
                            <h1 className='text-2xl md:text-3xl font-bold text-black mb-2'>
                                Welcome back
                            </h1>
                            <p className='text-sm text-neutral-500'>Sign in to continue your preparation</p>
                        </div>

                        <form onSubmit={handleSubmit} className='w-full'>
                            <div className='mb-5'>
                                <label htmlFor="email" className='text-neutral-700 mb-2'>
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder='you@example.com'
                                    className='w-full h-12 bg-white border border-neutral-300 rounded-lg px-4 text-sm text-black placeholder-neutral-400 outline-none focus:border-black transition-colors duration-200'
                                />
                            </div>
                            <div className='mb-2'>
                                <div className='flex items-center justify-between mb-2'>
                                    <label htmlFor="password" className='text-neutral-700'>
                                        Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    id='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='••••••••'
                                    className='w-full h-12 bg-white border border-neutral-300 rounded-lg px-4 text-sm text-black placeholder-neutral-400 outline-none focus:border-black transition-colors duration-200'
                                />
                            </div>
                            <button
                                type='submit'
                                className='w-full mt-6 bg-black hover:bg-neutral-800 text-white h-12 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200'>
                                Sign in
                            </button>
                        </form>

                        <p className='mt-6 text-center text-neutral-600'>
                            Don't have an account?{' '}
                            <Link to="/register" className='text-black font-semibold hover:underline'>
                                Create one
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Login
