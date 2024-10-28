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
    const commonClass = `py-2 px-6 rounded-2xl  w-full  bg-slate-50  outline-none focus:border-sky-500 border  transition-colors duration-300 hover:border-sky-500 text-sky-900 placeholder:text-slate-600`

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-8 bg-gradient-to-bl from-slate-100 to-sky-100">
            <h2 className="text-sky-400 text-5xl text-center uppercase">
                Zaloguj się
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 py-12 flex flex-col gap-4 bg-sky-100 rounded-2xl mt-12 border border-sky-200"
            >
                <div>
                    <input
                        className={`${commonClass}  ${errors.email ? 'border-red-500 focus:border-red-500 bg-red-100' : 'border-sky-200'}`}
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
                        className={`${commonClass}  ${errors.password ? 'border-red-500 focus:border-red-500 bg-red-100' : 'border-sky-200'}`}
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
                <div className=" flex flex-col gap-4 mt-4">
                    <button
                        className="w-full p-2 bg-sky-400 rounded-2xl font-medium text-sky-50 transition-colors duration-300 hover:bg-sky-500 flex items-center justify-center gap-2 "
                        disabled={isPending}
                    >
                        {isPending && <Spinner />} Zaloguj
                    </button>
                    <Link
                        to="/signup"
                        className=" block p-2 bg-sky-200 rounded-2xl text-center font-medium transition-colors duration-300 hover:bg-sky-300"
                    >
                        Wpisz się
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login
