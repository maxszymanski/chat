import { useRef } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import useLogout from '../users/useLogout'

function Modal() {
    const modalRef = useRef(null)
    const { handleToogleLogoutModal } = useChatContext()
    const { logout } = useLogout()
    useClickOutside(modalRef, handleToogleLogoutModal)

    return (
        <div className="inset-0 w-full h-full bg-black/35 absolute flex justify-center items-center px-4">
            <div
                className="bg-stone-100 p-8 rounded-xl text-center "
                ref={modalRef}
            >
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
            </div>
        </div>
    )
}

export default Modal
