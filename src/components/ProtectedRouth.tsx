import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../users/useUser'
import Loader from './Loader'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useUser()
    const navigate = useNavigate()

    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate('/login')
        },
        [isAuthenticated, isLoading, navigate]
    )
    if (isLoading) return <Loader />
    return isAuthenticated ? children : null
}

export default ProtectedRoute
