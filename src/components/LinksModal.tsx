import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useClickOutside from '../hooks/useClickOutside'
import { ChatBubbleLeftRightIcon, UserIcon } from '@heroicons/react/24/outline'

import AddRemoveFav from './AddRemoveFav'

function LinksModal({ id, onClick }: { id: string; onClick: () => void }) {
    const modalRef = useRef(null)
    useClickOutside(modalRef, onClick)

    return (
        <div
            ref={modalRef}
            className={` absolute bottom-[2rem] left-12 bg-slate-100 border border-sky-200 z-[1000] rounded-t-xl rounded-br-xl overflow-hidden`}
        >
            <Link
                to={`/account/${id}`}
                className="flex items-center gap-2 w-full p-4 hover:bg-sky-100  transition-colors duration-300 text-sky-950 border-b border-sky-200"
            >
                <UserIcon className="size-6 " />
                Przejdź do profilu
            </Link>
            <Link
                to={`/chat/${id}`}
                className="flex items-center gap-2 w-full p-4 hover:bg-sky-100  transition-colors duration-300 text-sky-950 border-b border-sky-200"
            >
                <ChatBubbleLeftRightIcon className="size-6 text-sky-500" />
                Przejdź do chatu
            </Link>
            <AddRemoveFav id={id} onClick={onClick} />
        </div>
    )
}

export default LinksModal
