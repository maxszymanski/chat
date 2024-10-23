import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useClickOutside from '../hooks/useClickOutside'
import {
    ChatBubbleLeftRightIcon,
    HeartIcon,
    UserIcon,
} from '@heroicons/react/24/outline'
import { useUpdateUserFriends } from '../hooks/useUpdateUserFriends'

function LinksModal({ id, onClick }: { id: string; onClick: () => void }) {
    const modalRef = useRef(null)
    useClickOutside(modalRef, onClick)
    const { updateFriends } = useUpdateUserFriends()

    const addToFavorite = () => {
        updateFriends(id, { onSuccess: () => onClick() })
    }

    return (
        <div
            ref={modalRef}
            className={` absolute top-[3.3rem] left-8 bg-slate-100 border border-sky-200 z-[1000] rounded-xl overflow-hidden`}
        >
            <Link
                to={`/account/${id}`}
                className="flex items-center gap-2 w-full p-4 hover:bg-blue-100  transition-colors duration-300 text-blue-950 border-b border-sky-200"
            >
                <UserIcon className="size-6 " />
                Przejdź do profilu
            </Link>
            <Link
                to={`/chat/${id}`}
                className="flex items-center gap-2 w-full p-4 hover:bg-blue-100  transition-colors duration-300 text-blue-950 border-b border-sky-200"
            >
                <ChatBubbleLeftRightIcon className="size-6 text-sky-500" />
                Przejdź do chatu
            </Link>
            <button
                onClick={addToFavorite}
                className="flex items-center gap-2 w-full p-4  hover:bg-blue-100  transition-colors duration-300 text-blue-950"
            >
                <HeartIcon className="size-6 text-red-500 pointer-events-none" />
                Dodaj do ulubionych
            </button>
        </div>
    )
}

export default LinksModal
