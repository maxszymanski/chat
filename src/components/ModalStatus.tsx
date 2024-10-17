import { useRef, useState } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import ModalLayout from './ModalLayout'
import { useUser } from '../hooks/useUser'

import { useUpdateStatus } from '../hooks/useUpdateStatus'
import { ArrowDownIcon } from '@heroicons/react/24/outline'

const statuses = [
    'Nowy na czacie – poznaj mnie!',
    'Chwila przerwy – wrócę później!',
    'Chętnie pogadam – śmiało napisz!',
    'Nie przeszkadzać.',
    'W wolnym tempie, ale odpiszę!',
    'Na szybkie rozmowy – kto się odważy?',
    'Tylko na chwilę!',
    'Przy kawie – kto się dosiądzie?',
    'Cisza w eterze – dziś bez rozmów.',
    'Otwarty na nowe znajomości!',
]

function ModalStatus() {
    const [isOpen, setIsOpen] = useState(false)
    const { user } = useUser()
    const [chatStatus, setChatStatus] = useState(user?.user_metadata.status)

    const modalRef = useRef(null)
    const { closeModal } = useChatContext()
    useClickOutside(modalRef, closeModal)
    const { updateStatus, isUpdatingStatus } = useUpdateStatus()

    const handleChangeStatus = () => {
        updateStatus(chatStatus)
    }

    return (
        <ModalLayout
            modalRef={modalRef}
            onClick={handleChangeStatus}
            btnConfirm="Potwierdź"
            isUpdating={isUpdatingStatus}
            isSettings={false}
        >
            <p className="text-blue-600 text-xl">Ustal status chatu!</p>
            <div className="mt-6 w-full pt-2 bg-blue-50 rounded-xl outline-none border-blue-300 border  transition-colors duration-300   text-blue-900 ">
                <button
                    className={`${isOpen ? ' pb-0' : 'pb-2'} flex  items-center justify-center w-full gap-5 `}
                    onClick={() => setIsOpen((is) => !is)}
                >
                    Wybierz status <ArrowDownIcon className="h-5 w-5 " />
                </button>

                <ul
                    className={`${isOpen ? 'flex pb-0' : 'hidden'}  w-full py-2  rounded-xl outline-none  transition-colors duration-300   text-blue-900 h-60 overflow-auto flex flex-col items-start text-base `}
                >
                    {statuses.map((status) => (
                        <li className="w-full bg-stone-50">
                            <button
                                className="w-full p-3 text-left border-t border-blue-300 bg-transparent hover:bg-blue-100 focus:bg-blue-100"
                                value={status}
                                onClick={(e) =>
                                    setChatStatus(
                                        (e.target as HTMLButtonElement).value
                                    )
                                }
                            >
                                {status}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </ModalLayout>
    )
}

export default ModalStatus
