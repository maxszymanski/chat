import { Link } from 'react-router-dom'
import { useFriend } from '../hooks/useFriend'
import Avatar from '../users/Avatar'
import {
    ChevronLeftIcon,
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline'

function ChatHeader() {
    const { friend } = useFriend()

    return (
        <div className="flex w-full justify-between items-center px-5 pt-6 pb-3 border-b border-gray-200 ">
            <div className="flex justify-between items-center gap-2.5">
                <Link className="block p-1.5" to="/chat">
                    <ChevronLeftIcon className="size-5" />
                </Link>
                <Link to={`/account/${friend?.id}`}>
                    <Avatar image={friend?.avatar || ''} />
                </Link>
                <p className="font-medium text-lg">{friend?.username || ''}</p>
            </div>
            <button className="p-1 ">
                <EllipsisVerticalIcon className="size-7 " />
            </button>
        </div>
    )
}

export default ChatHeader
