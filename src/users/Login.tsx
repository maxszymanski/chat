import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from './useLogin'
import { useUser } from './useUser'
import { useEffect } from 'react'
import { User } from '../types/types'

function Login() {
    const { login, isPending } = useLogin()

    const { isLoading, isAuthenticated } = useUser()
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        // formState: { errors },
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

    return (
        <div className="h-dvh flex flex-col items-center justify-center">
            <h2 className="text-blue-400 text-5xl text-center uppercase">
                Zaloguj się
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-8 py-12 flex flex-col gap-7 bg-blue-100 rounded-2xl mt-12"
            >
                <input
                    className="py-2 px-6 rounded-2xl"
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

                <input
                    className="py-2 px-6 rounded-2xl"
                    placeholder="Hasło"
                    id="password"
                    type="password"
                    {...register('password', {
                        required: 'Podane hasło jest nieprawidłowe',
                        minLength: {
                            value: 8,
                            message: 'Hasło nie może być krótsze niż 8 znaków',
                        },
                    })}
                />
                <button className="p-2 bg-blue-400 rounded-2xl font-medium text-blue-50">
                    {isPending ? 'Logowanie' : 'Zaloguj'}
                </button>
                <Link
                    to="/signup"
                    className=" block p-2 bg-blue-200 rounded-2xl text-center font-medium"
                >
                    Wpisz się
                </Link>
            </form>
        </div>
    )
}

export default Login
