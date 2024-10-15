import { useRef, useState } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import ModalLayout from './ModalLayout'
import { useUser } from '../hooks/useUser'
import { useUpdateAboutme } from '../hooks/useUpdateAboutme'

function ModalAbout() {
    const { user } = useUser()
    const [inputValue, setInputValue] = useState(user?.user_metadata.aboutme)
    const [isError, setIsError] = useState(false)
    const modalRef = useRef(null)
    const { closeModal } = useChatContext()
    useClickOutside(modalRef, closeModal)
    const { updateAboutme, isUpdatingAboutme } = useUpdateAboutme()

    const handleChangeUsername = () => {
        setIsError(inputValue === '')
        if (inputValue.length <= 0) return
        updateAboutme(inputValue)
    }

    return (
        <ModalLayout
            modalRef={modalRef}
            onClick={handleChangeUsername}
            btnConfirm="Potwierdź"
            isUpdating={isUpdatingAboutme}
            isSettings={false}
        >
            <p className="text-blue-600 text-xl">Opowiedz coś o sobię!</p>

            <textarea
                maxLength={200}
                value={inputValue}
                placeholder={isError ? `Pole nie może być puste` : ''}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                className={` mt-6 w-full p-2 bg-blue-100 rounded-xl px-4 outline-none focus:border-blue-500 border border-blue-300 transition-colors duration-300 hover:border-blue-500 text-lg text-blue-900 placeholder:text-stone-950  placeholder:text-sm resize-none h-56 ${isError ? 'border-red-500 bg-red-100' : ''}`}
            />
            <span className="text-xs text-right text-gray-600  block">
                Maksymalnie 200 słów
            </span>
        </ModalLayout>
    )
}

export default ModalAbout
