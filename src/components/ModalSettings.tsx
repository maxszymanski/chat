import { useRef } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import ModalLayout from './ModalLayout'
import {
    ChatBubbleLeftEllipsisIcon,
    LockClosedIcon,
    PencilIcon,
    UserIcon,
} from '@heroicons/react/24/outline'

function ModalSettings() {
    const modalRef = useRef(null)
    const { closeModal, openModal } = useChatContext()
    useClickOutside(modalRef, closeModal)

    return (
        <ModalLayout
            modalRef={modalRef}
            onClick={() => openModal('logout')}
            btnConfirm="Wyloguj"
            isUpdating={false}
            isSettings={false}
        >
            <p className="text-blue-600 text-2xl mb-5">Ustawienia</p>
            <div className="flex flex-col text-blue-900 items-start divide-y gap-1 divide-stone-200 w-full">
                <button
                    className="py-3 px-1 flex items-center gap-2 w-full text-left text-lg"
                    onClick={() => openModal('username')}
                >
                    <UserIcon className="w-6 h-6 text-blue-900" />
                    Zmień imię użytkownika
                </button>
                <button
                    className="py-3 px-1 flex items-center gap-2 w-full text-left text-lg"
                    onClick={() => openModal('status')}
                >
                    <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-blue-900" />
                    Zmień status chatu
                </button>
                <button
                    className="py-3 px-1 flex items-center gap-2 w-full text-left text-lg"
                    onClick={() => openModal('about')}
                >
                    <PencilIcon className="w-6 h-6 text-blue-900" />
                    Zmień opis
                </button>
                <button
                    className="py-3 px-1 flex items-center gap-2 w-full text-left text-lg"
                    onClick={() => openModal('password')}
                >
                    <LockClosedIcon className="w-6 h-6 text-blue-900" />
                    Zmień hasło
                </button>
            </div>
        </ModalLayout>
    )
}

export default ModalSettings
