import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div className="min-h-dvh bg-white p-4  flex items-center  justify-center sm:p-8">
            <div className="h-full max-w-xl lg:max-w-screen-md w-full mx-auto flex items-center  flex-col gap-6 text-center md:gap-10">
                <img
                    className="w-4/5 mb-4 sm:w-auto md:self-start md:-mb-2 "
                    src="/404.webp"
                    alt="404 error icon"
                />
                <h3 className="text-sky-500 text-4xl w-full md:text-7xl lg:text-8xl ">
                    Nic tutaj nie ma...
                </h3>
                <p className="text-[#184A56] w-full text-sm sm:text-base lg:text-lg md:text-left md:pl-5 2xl:text-xl md:leading-8 xl:leading-8">
                    Nie możemy znaleźć strony, której szukasz. <br /> Sprawdź
                    adres URL lub wróć do chatu.
                </p>
                <Link
                    className="py-4 px-8 border-2 transition-colors duration-300 border-sky-500 bg-transparent rounded-full text-sky-500 hover:bg-sky-100 md:text-lg md:self-start md:ml-5"
                    to="/chat"
                >
                    Wróć do Chatu
                </Link>
            </div>
        </div>
    )
}

export default PageNotFound
