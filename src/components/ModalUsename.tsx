import { useRef, useState } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import ModalLayout from './ModalLayout'
import { useUpdateUser } from '../hooks/useUpdateUser'
import { useMediaQuery } from 'react-responsive'

function ModalUsername() {
    const [inputValue, setInputValue] = useState('')
    const [isError, setIsError] = useState(false)
    const modalRef = useRef(null)
    const { closeModal } = useChatContext()
    useClickOutside(modalRef, closeModal)
    const { updateUser, isUpdatingName } = useUpdateUser()

    const handleChangeUsername = () => {
        setIsError(inputValue === '')
        if (inputValue.length <= 0) return
        updateUser(inputValue)
        setInputValue('')
    }
    const isLarge = useMediaQuery({
        query: '(min-width: 768px)',
    })

    return (
        <ModalLayout
            modalRef={modalRef}
            onClick={handleChangeUsername}
            btnConfirm="Potwierdź"
            isUpdating={isUpdatingName}
            isSettings={!isLarge}
        >
            <p className="text-sky-600 text-xl">Wprowadź nazwę użytkownika</p>
            <input
                value={inputValue}
                placeholder={isError ? `Pole nie może być puste` : ''}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                className={`mt-6 w-full p-2 bg-sky-100 rounded-xl px-4 outline-none focus:border-sky-500 border border-sky-200 transition-colors duration-300 hover:border-sky-500 text-lg text-sky-900 placeholder:text-stone-950 placeholder:text-sm ${isError ? 'border-red-500 bg-red-100' : ''}`}
            />
        </ModalLayout>
    )
}

export default ModalUsername
