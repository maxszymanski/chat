import { SubmitHandler, useForm } from 'react-hook-form'
import { User } from '../types/types'
import { useSignUp } from '../hooks/useSignUp'
import SingUpAsGuestButton from '../components/SingUpAsGuestButton'
import FormLink from '../components/FormLink'
import HomeFormButton from '../components/HomeFormButton'
import FormButtonsBox from '../components/FormButtonsBox'
import FormRow from '../components/FormRow'

function SignUp() {
    const { signUp, isPending } = useSignUp()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm<User>()

    const onSubmit: SubmitHandler<User> = (newUser) => {
        signUp(newUser, { onSettled: () => reset() })
    }

    return (
        <>
            <h2 className="text-6xl md:text-7xl text-center font-atma mb-8 sm:mb-6 md:mb-12 lg:mb-12 xl:mb-16 xl:text-8xl ">
                Wpisz się
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
                    error={errors?.username || null}
                    errorMessage={errors?.username?.message || null}
                    id="username"
                    type="text"
                    placeholder="Imię"
                    isPending={isPending}
                    formRegister={register('username', {
                        required: 'Prosze podać imię',
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
                <FormRow
                    error={errors?.passwordConfirm || null}
                    errorMessage={errors?.passwordConfirm?.message || null}
                    id="passwordConfirm"
                    type="password"
                    placeholder="Powtórz hasło"
                    isPending={isPending}
                    formRegister={register('passwordConfirm', {
                        required: 'Podane hasła nie są zgodne',
                        validate: (value) =>
                            value === getValues().password ||
                            'Hasła nie są identyczne',
                    })}
                />

                <FormButtonsBox>
                    <HomeFormButton isPending={isPending} text="Wpisz się" />
                    <FormLink to="/login" text="Logowanie" />
                    <SingUpAsGuestButton />
                </FormButtonsBox>
            </form>
        </>
    )
}

export default SignUp
