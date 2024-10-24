import { Link } from 'react-router-dom'
import { useChatContext } from '../context/useChatContext'
import Avatar from '../users/Avatar'
import { useUser } from '../hooks/useUser'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'

function Header() {
    const { openModal } = useChatContext()
    const { user } = useUser()

    const name = user?.user_metadata.username || 'User'

    return (
        <header className="border-b border-gray-200 p-4 md:p-6 flex items-center justify-between gap-4 bg-slate-100 ">
            <Link
                to="/chat"
                className="block text-blue-600 text-xl sm:text-2xl uppercase "
            >
                Live Chat
            </Link>
            <div className="flex items-center gap-4">
                <p className="hidden md:block text-blue-500 text-lg font-medium">
                    {name}
                </p>

                <Link
                    to="/account"
                    className="border border-stone-200 rounded-full"
                >
                    <Avatar image={user?.user_metadata.avatar} />
                </Link>

                <button
                    className="p-2 ml-1 text-blue-600"
                    onClick={() => openModal('logout')}
                >
                    <ArrowLeftEndOnRectangleIcon className="size-6" />
                </button>
            </div>
        </header>
    )
}

export default Header
