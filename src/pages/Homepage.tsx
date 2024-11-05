import { Outlet, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'
import Loader from '../components/Loader'

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
        <div className="min-h-dvh flex flex-col items-end justify-center bg-home  lg:bg-homeLarge bg-cover lg:bg-right relative bg-center pl-20 pr-2.5 py-6 sm:pr-6 md:pl-0 md:pr-28">
            <div className="flex flex-col items-center lg:absolute top-1/2 lg:left-[30%] lg:-translate-x-1/2 lg:-translate-y-1/2   sm:max-w-[25rem] xl:max-w-md text-center text-primary">
                <Outlet />
            </div>
        </div>
    )
}

export default Homepage
