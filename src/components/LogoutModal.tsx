import { useRef } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import useLogout from '../hooks/useLogout'
import ModalLayout from './ModalLayout'

function LogoutModal() {
    const modalRef = useRef(null)
    const { closeModal } = useChatContext()
    const { logout, isLogingOut } = useLogout()
    useClickOutside(modalRef, closeModal)

    return (
        <ModalLayout
            isSettings={false}
            modalRef={modalRef}
            onClick={() => {
                logout()
                closeModal()
            }}
            btnConfirm="Wyloguj"
            isUpdating={isLogingOut}
        >
            <p className="text-blue-600 text-xl">
                Czy napewno chcesz się wylogować?
            </p>
        </ModalLayout>
    )
}

export default LogoutModal
