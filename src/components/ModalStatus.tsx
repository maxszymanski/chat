import { useRef, useState } from 'react'
import { useChatContext } from '../context/useChatContext'
import useClickOutside from '../hooks/useClickOutside'
import ModalLayout from './ModalLayout'
import { useUser } from '../hooks/useUser'

import { useUpdateStatus } from '../hooks/useUpdateStatus'

const statuses = [
    'Nowy na czacie – poznaj mnie!',
    'Chwila przerwy – wrócę później!',
    'Chętnie pogadam – śmiało napisz!',
    'Nie przeszkadzać – skupiony na czymś innym.',
    'W wolnym tempie, ale odpiszę!',
    'Na szybkie rozmowy – kto się odważy?',
    'Tylko na chwilę – złap mnie, póki tu jestem!',
    'Offline mentalnie, ale online fizycznie.',
    'Przy kawie – kto się dosiądzie?',
    'Cisza w eterze – dziś bez rozmów.',
    'Otwarte na nowe znajomości – pisz śmiało!',
]

function ModalStatus() {
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
            <p className="text-blue-600 text-xl">
                Dostosuj status do swojego nastroju!
            </p>
            <div className="mt-6 w-full py-2 bg-blue-50 rounded-xl outline-none border-blue-300 border  transition-colors duration-300   text-blue-900 ">
                <button>Wybierz status:</button>

                <ul className="  w-full py-2 bg-blue-50 rounded-xl outline-none  transition-colors duration-300   text-blue-900 h-60 overflow-auto flex flex-col items-start text-base ">
                    {statuses.map((status) => (
                        <li className="w-full">
                            <button
                                className="w-full p-3 text-left border-b border-blue-300 bg-transparent hover:bg-blue-500"
                                value={status}
                                onClick={(e) => setChatStatus(e.target.value)}
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
