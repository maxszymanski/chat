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
                        className="py-3 px-6 font-semibold bg-sky-100 rounded-xl border border-sky-200 text-sky-900 outline-none focus:border-sky-700   transition-colors duration-300 hover:bg-sky-50 "
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
                        className="py-3 px-6 font-semibold bg-sky-400 rounded-xl border border-sky-300 w-fit text-stone-50 outline-none focus:bg-sky-600  transition-colors duration-300 hover:bg-sky-500 min-h-[50px] min-w-[122px] disabled:bg-sky-300 flex gap-1 items-center justify-center"
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
