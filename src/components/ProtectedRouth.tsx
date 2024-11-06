import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useUser } from '../hooks/useUser'
import Loader from './Loader'
import ModalManager from './ModalManager'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useUser()
    const navigate = useNavigate()

    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) navigate('/')
        },
        [isAuthenticated, isLoading, navigate]
    )
    if (isLoading) return <Loader />
    return isAuthenticated ? (
        <>
            {children}
            <ModalManager />
        </>
    ) : null
}

export default ProtectedRoute
