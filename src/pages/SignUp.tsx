import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { useEffect } from 'react'
import { User } from '../types/types'
import { useSignUp } from '../hooks/useSignUp'
import Spinner from '../components/Spinner'

function SignUp() {
    const { signUp, isPending } = useSignUp()

    const { isLoading, isAuthenticated } = useUser()
    const navigate = useNavigate()
    const MAX_USER_NUMBER = 10000

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm<User>()

    useEffect(
        function () {
            if (isAuthenticated && !isLoading)
                navigate('/chat', { replace: true })
        },
        [isAuthenticated, isLoading, navigate]
    )

    const onSubmit: SubmitHandler<User> = (newUser) => {
        signUp(newUser, { onSettled: () => reset() })
    }

    const SignUpAsGuest = () => {
        const randomUserNumer = Math.floor(Math.random() * MAX_USER_NUMBER)

        const guestUser = {
            email: `guest@guest${randomUserNumer}.com`,
            username: `Gość ${randomUserNumer}`,
            password: '12345678',
            passwordConfirm: '12345678',
        }
        if (guestUser) signUp(guestUser, { onSettled: () => reset() })
    }

    const commonClass = `py-2 px-6 rounded-2xl  w-full  bg-primary/20  outline-none focus:border-stone-300 border  transition-colors duration-300 hover:border-stone-300 text-stone-100 xl:py-2.5  xl:placeholder:text-lg xl:text-lg`

    return (
        <>
            <h2 className="text-6xl md:text-7xl text-center font-atma mb-8 sm:mb-6 md:mb-12 lg:mb-12 xl:mb-16 xl:text-8xl ">
                Wpisz się
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
                        className={`${commonClass}  ${errors.username ? 'border-red-500 focus:border-red-500 placeholder:text-red-500 ' : 'border-primary placeholder:text-stone-300'}`}
                        placeholder="Imię"
                        id="username"
                        type="text"
                        disabled={isPending}
                        {...register('username', {
                            required: 'Prosze podać imię',
                        })}
                    />
                    {errors.username && (
                        <p className="text-xs text-red-500 mt-0.5 ml-2">
                            {errors.username.message}
                        </p>
                    )}
                </div>
                <div>
                    <input
                        className={`${commonClass}  ${errors.password ? 'border-red-500 focus:border-red-500 placeholder:text-red-500 ' : 'border-primary placeholder:text-stone-300'}`}
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
                <div>
                    <input
                        className={`${commonClass}  ${errors.passwordConfirm ? 'border-red-500 focus:border-red-500 placeholder:text-red-500 ' : 'border-primary placeholder:text-stone-300'}`}
                        type="password"
                        id="passwordConfirm"
                        placeholder="Powtórz hasło"
                        disabled={isPending}
                        {...register('passwordConfirm', {
                            required: 'Podane hasła nie są zgodne',
                            validate: (value) =>
                                value === getValues().password ||
                                'Hasła nie są identyczne',
                        })}
                    />
                    {errors.passwordConfirm && (
                        <p className="text-xs text-red-500 mt-0.5 ml-2">
                            {errors.passwordConfirm.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-4 mt-4 font-atma tracking-wider xl:gap-5 xl:mt-5">
                    <button
                        type="submit"
                        className="w-full p-2 bg-primary rounded-2xl font-medium text-stone-100 transition-colors duration-300 hover:bg-[#3868af] flex items-center justify-center gap-2 md:text-xl text-lg"
                        disabled={isPending}
                    >
                        {isPending && <Spinner />} Wpisz się
                    </button>
                    <Link
                        to="/login"
                        className=" block p-2 md:text-xl text-lg bg-secondary rounded-2xl 
                        text-[#041927]  text-center font-medium transition-colors duration-300 hover:bg-[#6c82a4]"
                    >
                        Logowanie
                    </Link>
                    <button
                        onClick={SignUpAsGuest}
                        type="button"
                        className="w-full p-2 bg-white/20 backdrop-blur-sm rounded-2xl font-medium text-stone-200 transition-colors duration-300 hover:bg-white/30 flex items-center justify-center gap-2 md:text-xl text-lg"
                    >
                        {isPending && <Spinner />} Wpisz sie jako gość
                    </button>
                </div>
            </form>
        </>
    )
}

export default SignUp
