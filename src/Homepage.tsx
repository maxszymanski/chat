import { Link, useNavigate } from 'react-router-dom'
import { useUser } from './users/useUser'
import { useEffect } from 'react'
import Loader from './components/Loader'

function Homepage() {
    const { isAuthenticated, isLoading } = useUser()
    const navigate = useNavigate()

    useEffect(
        function () {
            if (isAuthenticated && !isLoading)
                navigate('/chat', { replace: true })
        },
        [isAuthenticated, isLoading, navigate]
    )

    if (isLoading) return <Loader />

    return (
        <div className="h-dvh flex flex-col items-center justify-center">
            <h2 className="text-blue-400 text-6xl text-center uppercase">
                Live Chat
            </h2>
            <div className="flex flex-col mt-16 gap-7">
                <Link
                    to={isAuthenticated ? '/chat' : '/login'}
                    className=" block py-3 px-8 bg-blue-500 rounded-2xl text-center font-medium text-blue-50 text-lg"
                >
                    Chat
                </Link>
                <Link
                    to="/signup"
                    className=" block py-3 px-8 bg-blue-200 rounded-2xl text-center font-medium text-lg text-blue-900"
                >
                    Wpisz się
                </Link>
            </div>
        </div>
    )
}

export default Homepage
