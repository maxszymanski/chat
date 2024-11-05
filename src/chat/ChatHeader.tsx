import { Link } from 'react-router-dom'
import { useFriend } from '../hooks/useFriend'
import Avatar from '../users/Avatar'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

function ChatHeader() {
    const { friend } = useFriend()

    return (
        <div className="flex w-full justify-between items-center px-5 pt-6 pb-3 border-b border-gray-200 ">
            <div className="flex justify-between items-center gap-2.5">
                <Link className="block p-1.5" to="/chat">
                    <ChevronLeftIcon className="size-5" />
                </Link>
                <Link
                    className=" border-2 border-transparent duration-300 transition-colors rounded-full hover:border-sky-400"
                    to={`/account/${friend?.id}`}
                >
                    <Avatar image={friend?.avatar || ''} />
                </Link>
                <p className="font-medium text-lg">{friend?.username || ''}</p>
            </div>
        </div>
    )
}

export default ChatHeader
