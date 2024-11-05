import { Link } from 'react-router-dom'
import { useUser } from '../hooks/useUser'

function Welcome() {
    const { isAuthenticated } = useUser()
    return (
        <>
            <h2 className=" text-6xl md:text-8xl text-center font-atma mb-8 sm:mb-6 md:mb-8 xl:mb-12 xl:text-9xl">
                Paplanek
            </h2>
            <p className=" max-w-[17rem] md:max-w-full xl:text-lg text-secondary">
                Wejdź, rozsiądź się i paplaj bez końca! <br /> Tu każda rozmowa
                jest lekka, a tematy biorą się same!”
            </p>
            <div className="flex flex-col mt-8 lg:mt-16 gap-7 font-atma">
                <Link
                    to={isAuthenticated ? '/chat' : '/login'}
                    className=" block py-3 px-12  rounded-2xl text-center font-medium font-atma text-sky-100 md:text-xl text-lg bg-primary tracking-wider  transition-colors duration-300 hover:bg-[#3868af] border border-primary"
                >
                    PoPaplaj!
                </Link>
                <Link
                    to="/signup"
                    className=" block py-3 px-12 bg-secondary rounded-2xl text-center font-medium md:text-xl text-lg text-[#041927] transition-colors duration-300 hover:bg-[#6c82a4] tracking-wider border border-secondary"
                >
                    Wpisz się
                </Link>
            </div>
        </>
    )
}

export default Welcome
