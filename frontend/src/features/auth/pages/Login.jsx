import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'

const Login = () => {

    const { loading, handleLogin, user } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/generate')
    }

    if (loading) {
        return (
            <div className='w-full h-screen bg-gray-950 flex justify-center items-center text-white text-3xl'>
                <h1>Loading.....</h1>
            </div>
        )
    }


    return (
        <>
            <div className='bg-gray-950 w-full h-full'>

                <div className="w-full max-h-30 bg-gray-900 flex justify-center items-center p-8 text-white">
                    <div className='flex justify-center items-center gap-2'>
                        <img src="/logo.png" alt="logo" className='w-10' />
                        <h1 className="text-lg md:text-xl lg:text-2xl font-bold select-none">InterviewMentor
                            <span className='text-blue-400'> AI</span>
                        </h1>
                    </div>
                </div>

                <div className=' bg-gray-950 flex flex-col p-4 pb-8 my-24 justify-center items-center text-white'>
                    <form onSubmit={handleSubmit}
                        className='sm:w-1/2 md:w-84 lg:w-100 flex flex-col bg-gray-900 p-4 px-8 rounded-xl'>
                        <div className='flex justify-center'>
                            <h1 className='text-xl md:text-3xl font-bold my-4 text-blue-400'>Login</h1>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="text"
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder='Enter email address'
                                className='bg-neutral-300 text-black w-full h-10 rounded p-2 my-2 text-sm outline-none flex' />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder='Password'
                                className='bg-neutral-300 text-black w-full h-10 rounded p-2 my-2 text-sm outline-none flex' />
                        </div>
                        <button type='submit'
                            className='bg-blue-600 hover:bg-blue-500  text-white p-2 mt-2 mb-4 rounded'>Login</button>
                        <div>
                            <p>Don't have an account? <Link to={"/register"} className='text-blue-500'>Register</Link></p>
                        </div>
                    </form>

                </div>
<Footer/>
            </div>

        </>
    )
}

export default Login
