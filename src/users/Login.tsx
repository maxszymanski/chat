import { SubmitHandler, useForm } from 'react-hook-form'
import useLogin from '../hooks/useLogin'
import { User } from '../types/types'
import FormLink from '../components/FormLink'
import HomeFormButton from '../components/HomeFormButton'
import FormButtonsBox from '../components/FormButtonsBox'
import FormRow from '../components/FormRow'
import LoginTestButton from '../components/LoginTestButton'

function Login() {
    const { login, isPending } = useLogin()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<User>()

    const onSubmit: SubmitHandler<User> = (user) => {
        login(user, {
            onSuccess: () => {
                reset()
            },
        })
    }

    return (
        <>
            <h2 className="text-6xl md:text-7xl text-center font-atma mb-8 sm:mb-6 md:mb-12 lg:mb-12 xl:mb-16 xl:text-8xl ">
                Zaloguj się
            </h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 py-10 flex flex-col gap-4 bg-white/10 backdrop-blur-sm rounded-2xl md:px-12  xl:gap-5"
            >
                <FormRow
                    error={errors?.email || null}
                    errorMessage={errors?.email?.message || null}
                    id="email"
                    type="email"
                    placeholder="Email"
                    isPending={isPending}
                    formRegister={register('email', {
                        required: 'Nieprawidłowy adres email',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Proszę podać poprawny adres email',
                        },
                    })}
                />
                <FormRow
                    error={errors?.password || null}
                    errorMessage={errors?.password?.message || null}
                    id="password"
                    type="password"
                    placeholder="Hasło"
                    isPending={isPending}
                    formRegister={register('password', {
                        required: 'Podane hasło jest nieprawidłowe',
                        minLength: {
                            value: 8,
                            message: 'Hasło nie może być krótsze niż 8 znaków',
                        },
                    })}
                />
                <FormButtonsBox>
                    <HomeFormButton isPending={isPending} text="Zaloguj" />
                    <FormLink to="/signup" text="Wpisz się" />
                    <LoginTestButton />
                </FormButtonsBox>
            </form>
        </>
    )
}

export default Login
