import { RefObject } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import Spinner from './Spinner'

function ModalLayout({
    children,
    modalRef,
    onClick,
    isUpdating,
    btnConfirm,
}: {
    children: React.ReactNode
    modalRef: RefObject<HTMLDivElement>
    onClick: () => void
    isUpdating: boolean
    btnConfirm: string
}) {
    const { closeModal } = useChatContext()
    useClickOutside(modalRef, closeModal)

    return (
        <div className="inset-0 w-full h-full bg-black/35 absolute flex justify-center items-center px-4">
            <div
                className="bg-stone-100 p-8  rounded-xl text-center animate-visible"
                ref={modalRef}
            >
                {children}
                <div className="flex justify-evenly mt-10 gap-6  ">
                    <button
                        className="py-3 px-6 font-semibold bg-stone-200 rounded-xl border border-stone-300 text-stone-950 outline-none focus:border-blue-500   transition-colors duration-300 hover:border-stone-500 "
                        onClick={closeModal}
                        disabled={isUpdating}
                    >
                        Anuluj
                    </button>
                    <button
                        className="py-3 px-6 font-semibold bg-blue-500 rounded-xl border border-stone-300 text-stone-50 outline-none focus:bg-blue-700  transition-colors duration-300 hover:bg-blue-600 min-h-[50px] min-w-[122px] disabled:bg-blue-400"
                        onClick={onClick}
                        disabled={isUpdating}
                    >
                        {isUpdating ? <Spinner /> : `${btnConfirm}`}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalLayout
