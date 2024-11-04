import { Link, useNavigate } from 'react-router-dom'
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-home  lg:bg-homeLarge bg-cover bg-right relative">
            <div className="flex flex-col items-center relative md:absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2  max-w-[25rem] text-center text-[#7891B7]">
                <h2 className=" text-8xl text-center font-atma mb-6">
                    Paplanek
                </h2>
                <p className="">
                    Wejdź, rozsiądź się i paplaj bez końca! <br /> Tu każda
                    rozmowa jest lekka, a tematy biorą się same!”
                </p>
                <div className="flex flex-col mt-16 gap-7 font-atma">
                    <Link
                        to={isAuthenticated ? '/chat' : '/login'}
                        className=" block py-3 px-8  rounded-2xl text-center font-medium text-[#90a2bd] text-xl bg-[#32529B] tracking-wider  transition-colors duration-300 hover:bg-[#4366b7]   "
                    >
                        Paplaj!
                    </Link>
                    <Link
                        to="/signup"
                        className=" block py-3 px-8 bg-[#7891B7] rounded-2xl text-center font-medium text-xl text-sky-950 transition-colors duration-300 hover:bg-[#6c82a4] tracking-wider"
                    >
                        Wpisz się
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Homepage
