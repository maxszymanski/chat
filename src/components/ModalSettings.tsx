import { useRef } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import ModalLayout from './ModalLayout'

import Settings from './Settings'

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
            <p className="text-sky-600 text-2xl mb-5">Ustawienia</p>
            <Settings />
        </ModalLayout>
    )
}

export default ModalSettings
