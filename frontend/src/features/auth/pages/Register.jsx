import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Footer from '../../../components/Footer'
import Navbar from '../../../components/Navbar'

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
            < div className='w-full h-screen bg-gray-900 flex justify-center items-center text-white text-3xl' >
                <h1>Loading.....</h1>
            </div >
        )
    }


    return (
        <>
            <div className="bg-gray-950 w-full h-ful">

                <div className="w-full max-h-30 bg-gray-900 flex justify-center items-center p-8 text-white">
                    <div className='flex justify-center items-center gap-2'>
                        <img src="/logo.png" alt="logo" className='w-10 relative' />
                        <h1 className="text-lg md:text-xl lg:text-2xl font-bold select-none">InterviewMentor
                            <span className='text-blue-400'> AI</span>
                        </h1>
                    </div>
                </div>

                <div className=' bg-gray-950 flex flex-col p-4 pb-8 mt-8 justify-center items-center text-white'>
                    <form onSubmit={handleSubmit}
                        className='sm:w-1/2 md:w-84 lg:w-100 flex flex-col bg-gray-900 p-4 px-8 rounded-xl'>
                        <div className='flex justify-center'>
                            <h1 className='font-bold text-xl md:text-3xl my-4 text-blue-400'>Register</h1>
                        </div>
                        <div>
                            <label htmlFor="">Full name</label>
                            <input type="text"
                                onChange={(e) => { setName(e.target.value) }}
                                placeholder='Enter your full name'
                                className='bg-neutral-300 text-black w-full h-10 rounded p-2 my-2 text-sm outline-none flex' />
                        </div>
                        <div>
                            <label htmlFor="">Username</label>
                            <input type="text"
                                onChange={(e) => { setUsername(e.target.value) }}
                                placeholder='Enter username'
                                className='bg-neutral-300 text-black w-full h-10 rounded p-2 my-2 text-sm outline-none flex' />
                        </div>
                        <div>
                            <label htmlFor="">Email</label>
                            <input type="text"
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder='Enter your email'
                                className='bg-neutral-300 text-black w-full h-10 rounded p-2 my-2 text-sm outline-none flex' />
                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <input type="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                                placeholder='Enter password'
                                className='bg-neutral-300 text-black w-full h-10 rounded p-2 my-2 text-sm outline-none flex' />
                        </div>
                        <button type='submit'
                            className='bg-blue-600 hover:bg-blue-500   text-white p-2 my-2 rounded'>Register</button>
                        <div>
                            <p>Already have an account? <Link to={'/login'} className='text-blue-500'>Login</Link></p>
                        </div>
                    </form>

                </div>
            </div>
<Footer/>
        </>
    )
}

export default Register
