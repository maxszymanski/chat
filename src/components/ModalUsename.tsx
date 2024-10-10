import { useRef, useState } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import ModalLayout from './ModalLayout'
import { useUpdateUser } from '../users/useUpdateUser'

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

    return (
        <ModalLayout
            modalRef={modalRef}
            onClick={handleChangeUsername}
            btnConfirm="Potwierdź"
            isUpdating={isUpdatingName}
        >
            <p className="text-blue-600 text-xl">Wprowadź nazwę użytkownika</p>
            <input
                value={inputValue}
                placeholder={isError ? `Pole nie może być puste` : ''}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                className={`mt-6 w-full p-2 bg-blue-100 rounded-xl px-4 outline-none focus:border-blue-500 border border-transparent transition-colors duration-300 hover:border-blue-500 text-lg text-blue-900 placeholder:text-stone-950 placeholder:text-sm ${isError ? 'border-red-500 bg-red-100' : ''}`}
            />
            <span></span>
        </ModalLayout>
    )
}

export default ModalUsername
