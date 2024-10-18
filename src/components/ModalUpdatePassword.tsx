import { useRef } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import ModalLayout from './ModalLayout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUpdatePassword } from '../hooks/useUpdatePassword'
import { Pass } from '../types/types'

function ModalUpdatePassword() {
    const {
        getValues,
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Pass>()
    const modalRef = useRef(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const { closeModal } = useChatContext()
    const { updatePassword, isUpdatingPassword } = useUpdatePassword()
    useClickOutside(modalRef, closeModal)

    const onSubmit: SubmitHandler<Pass> = ({ password }) => {
        updatePassword(password, {
            onSettled: () => reset(),
        })
    }

    const handleOutsideSubmit = () => {
        if (formRef.current) {
            formRef.current.requestSubmit()
        }
    }

    return (
        <ModalLayout
            isSettings
            modalRef={modalRef}
            onClick={() => {
                handleOutsideSubmit()
            }}
            btnConfirm="Zmień"
            isUpdating={isUpdatingPassword}
        >
            <p className="text-blue-600 text-xl mb-7">Zmień swoje hasło</p>
            <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 max-w-72 mx-auto "
            >
                <div className="w-full">
                    <input
                        className={`p-2 bg-blue-100 rounded-xl px-4 outline-none focus:border-blue-500 border  transition-colors duration-300 hover:border-blue-500 text-lg text-blue-900 placeholder:text-stone-950 placeholder:text-sm w-full mb-1 ${errors.password ? 'border-red-500 focus:border-red-500 bg-red-100' : 'border-transparent'}`}
                        placeholder="Hasło"
                        id="password"
                        type="password"
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
                        <p className="text-xs text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="w-full">
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
                        disabled={isUpdatingPassword}
                        className={`p-2 bg-blue-100 rounded-xl px-4 outline-none focus:border-blue-500 border  transition-colors duration-300 hover:border-blue-500 text-lg text-blue-900 placeholder:text-stone-950 placeholder:text-sm w-full mb-1 ${errors.passwordConfirm ? 'border-red-500 focus:border-red-500 bg-red-100' : 'border-transparent'}`}
                    />
                    {errors.passwordConfirm && (
                        <p className="text-xs text-red-500">
                            {errors.passwordConfirm.message}
                        </p>
                    )}
                </div>
                <button className="hidden"></button>
            </form>
        </ModalLayout>
    )
}

export default ModalUpdatePassword
