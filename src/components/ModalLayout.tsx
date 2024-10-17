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
    isSettings = false,
}: {
    children: React.ReactNode
    modalRef: RefObject<HTMLDivElement>
    onClick: () => void
    isUpdating: boolean
    btnConfirm: string
    isSettings: boolean | null
}) {
    const { closeModal, openModal } = useChatContext()
    useClickOutside(modalRef, closeModal)

    return (
        <div className="inset-0 w-full h-screen bg-black/35 absolute flex justify-center items-center px-4 overflow-hidden">
            <div
                className="bg-stone-100 p-6  rounded-xl text-center animate-visible w-full max-w-lg"
                ref={modalRef}
            >
                {children}
                <div className="flex justify-evenly mt-10 gap-2  ">
                    <button
                        className="py-3 px-6 font-semibold bg-stone-200 rounded-xl border border-stone-300 text-stone-950 outline-none focus:border-blue-500   transition-colors duration-300 hover:border-stone-500 "
                        onClick={
                            isSettings
                                ? () => openModal('settings')
                                : closeModal
                        }
                        disabled={isUpdating}
                    >
                        Anuluj
                    </button>

                    <button
                        className="py-3 px-6 font-semibold bg-blue-500 rounded-xl border border-stone-300 w-fit text-stone-50 outline-none focus:bg-blue-700  transition-colors duration-300 hover:bg-blue-600 min-h-[50px] min-w-[122px] disabled:bg-blue-400 flex gap-1 items-center justify-center"
                        onClick={onClick}
                        disabled={isUpdating}
                    >
                        {isUpdating && <Spinner />}

                        {btnConfirm}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalLayout
