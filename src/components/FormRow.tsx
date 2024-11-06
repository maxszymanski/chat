import { FormInputTypes } from '../types/types'

function FormRow({
    error,
    placeholder,
    type,
    id,
    formRegister,
    errorMessage,
    isPending,
}: FormInputTypes) {
    return (
        <div>
            <input
                className={`py-2 px-6 rounded-2xl  w-full  bg-primary/20  outline-none focus:border-stone-300 border  transition-colors duration-300 hover:border-stone-300 text-stone-100 xl:py-2.5  xl:placeholder:text-lg xl:text-lg ${error ? 'border-red-500 focus:border-red-500 placeholder:text-red-500 ' : 'border-primary placeholder:text-stone-300'}`}
                placeholder={placeholder}
                id={id}
                type={type}
                disabled={isPending}
                {...formRegister}
            />
            {error && (
                <p className="text-xs text-red-500 mt-0.5 ml-2">
                    {errorMessage}
                </p>
            )}
        </div>
    )
}

export default FormRow
