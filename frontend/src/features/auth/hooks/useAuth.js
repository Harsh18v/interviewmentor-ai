import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { login, register, logout, getMe } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleRegister = async ({ name, username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ name, username, email, password })
            setUser(data.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            localStorage.setItem("token", data.token);
            setUser(data.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            const data = await logout()
            setUser(null)
            alert('Logged out successfully')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleGetMe = async () => {
        setLoading(true)
        try {
            const data = await getMe()
            setUser(data.user)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const data = await getMe()
                setUser(data.user)
            } catch (err) {
                console.log(err)
                localStorage.removeItem("token");
            } finally {
                setLoading(false)
            }
        }

        fetchUser()

    }, [])

    return {
        user,
        loading,
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe,
    }
}