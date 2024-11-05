import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'
import { User } from '../types/types'
import Spinner from '../components/Spinner'

function Login() {
    const { login, isPending } = useLogin()

    const { isLoading, isAuthenticated } = useUser()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<User>()

    useEffect(
        function () {
            if (isAuthenticated && !isLoading)
                navigate('/chat', { replace: true })
        },
        [isAuthenticated, isLoading, navigate]
    )

    const onSubmit: SubmitHandler<User> = (user) => {
        login(user, {
            onSuccess: () => {
                reset()
                navigate('/chat', { replace: true })
            },
        })
    }
    const commonClass = `py-2 px-6 rounded-2xl  w-full  bg-primary/20  outline-none focus:border-stone-300 border  transition-colors duration-300 hover:border-stone-300 text-stone-100 xl:py-2.5  xl:placeholder:text-lg xl:text-lg`

    return (
        <>
            <h2 className="text-6xl md:text-7xl text-center font-atma mb-8 sm:mb-6 md:mb-12 lg:mb-12 xl:mb-16 xl:text-8xl ">
                Zaloguj się
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 py-10 flex flex-col gap-4 bg-white/10 backdrop-blur-sm rounded-2xl md:px-12  xl:gap-5"
            >
                <div>
                    <input
                        className={`${commonClass}  ${errors.email ? 'border-red-500 focus:border-red-500 placeholder:text-red-500 ' : 'border-primary placeholder:text-stone-300'}`}
                        placeholder="Email"
                        id="email"
                        type="email"
                        disabled={isPending}
                        {...register('email', {
                            required: 'Nieprawidłowy adres email',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Proszę podać poprawny adres email',
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-0.5 ml-2">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <input
                        className={`${commonClass}  ${errors.password ? 'border-red-500 focus:border-red-500  placeholder:text-red-500' : 'border-primary placeholder:text-stone-300'}`}
                        placeholder="Hasło"
                        id="password"
                        type="password"
                        disabled={isPending}
                        {...register('password', {
                            required: 'Podane hasło jest nieprawidłowe',
                            minLength: {
                                value: 8,
                                message:
                                    'Hasło nie może być krótsze niż 8 znaków',
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-0.5 ml-2">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className=" flex flex-col gap-4 mt-4 font-atma tracking-wider xl:gap-5 xl:mt-5">
                    <button
                        className="w-full p-2 bg-primary rounded-2xl font-medium text-stone-100 transition-colors duration-300 hover:bg-[#3868af] flex items-center justify-center gap-2 md:text-xl text-lg"
                        disabled={isPending}
                    >
                        {isPending && <Spinner />} Zaloguj
                    </button>
                    <Link
                        to="/signup"
                        className=" block p-2 md:text-xl text-lg bg-secondary rounded-2xl 
                        text-[#041927]  text-center font-medium transition-colors duration-300 hover:bg-[#6c82a4]"
                    >
                        Wpisz się
                    </Link>
                    <button className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-2xl font-medium text-stone-200 transition-colors duration-300 hover:bg-white/30 flex items-center justify-center gap-2 md:text-xl text-lg">
                        Wpisz sie jako gość
                    </button>
                </div>
            </form>
        </>
    )
}

export default Login
