import { useRef } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import useLogout from '../users/useLogout'
import ModalLayout from './ModalLayout'

function LogoutModal() {
    const modalRef = useRef(null)
    const { handleToogleLogoutModal } = useChatContext()
    const { logout } = useLogout()
    useClickOutside(modalRef, handleToogleLogoutModal)

    return (
        <ModalLayout modalRef={modalRef}>
            <p className="text-blue-600 text-lg">
                Czy napewno chcesz się wylogować?
            </p>
            <div className="flex justify-evenly mt-6 gap-6">
                <button
                    className="py-3 px-6 font-semibold bg-stone-200 rounded-xl border border-stone-300 text-stone-950"
                    onClick={handleToogleLogoutModal}
                >
                    Anuluj
                </button>
                <button
                    className="py-3 px-6 font-semibold bg-blue-500 rounded-xl border border-stone-300 text-stone-50"
                    onClick={() => {
                        logout()
                        handleToogleLogoutModal()
                    }}
                >
                    Wyloguj
                </button>
            </div>
        </ModalLayout>
    )
}

export default LogoutModal
