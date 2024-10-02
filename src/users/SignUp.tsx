import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from './useUser'
import { useEffect } from 'react'
import { User } from '../types/types'
import Loader from '../components/Loader'
import { useSignUp } from './useSignUp'

function SignUp() {
    const { signUp, isPending } = useSignUp()

    const { isLoading, isAuthenticated } = useUser()
    const navigate = useNavigate()

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
        // createUser(userInfo)
    }

    return (
        <div className="h-dvh flex flex-col items-center justify-center">
            <h2 className="text-blue-400 text-5xl text-center uppercase">
                Wpisz się
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
                    placeholder="Imię"
                    id="username"
                    type="text"
                    {...register('username', {
                        required: 'Nieprawidłowe Imię',
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
                <input
                    {...register('passwordConfirm', {
                        required: 'Podane hasła nie są zgodne',
                        validate: (value) =>
                            value === getValues().password ||
                            'Hasła nie są identyczne',
                    })}
                    type="password"
                    id="passwordConfirm"
                    placeholder="Powtórz hasło"
                    disabled={isPending}
                    className="py-2 px-6 rounded-2xl"
                />
                <button className="p-2 bg-blue-400 rounded-2xl font-medium text-blue-50">
                    {isPending ? 'Wpisywanie...' : 'Wpisz się'}
                </button>
                <Link
                    to="/login"
                    className=" block p-2 bg-blue-200 rounded-2xl text-center font-medium"
                >
                    Logowanie
                </Link>
            </form>
        </div>
    )
}

export default SignUp
