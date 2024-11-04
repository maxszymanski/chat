import { Link } from 'react-router-dom'
import { useChatContext } from '../context/useChatContext'
import Avatar from '../users/Avatar'
import { useUser } from '../hooks/useUser'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'

function Header() {
    const { openModal } = useChatContext()
    const { user } = useUser()

    const name = user?.user_metadata.username || ''

    return (
        <header className="border-b border-sky-200 p-4 md:p-6 flex items-center justify-between gap-4 bg-slate-100 ">
            <Link
                to="/chat"
                className="font-atma font-medium block text-sky-500 text-2xl sm:text-3xl  "
            >
                Paplanek
            </Link>
            <div className="flex items-center gap-4">
                <p className="hidden md:block text-sky-500 text-lg font-medium">
                    {name}
                </p>

                <Link
                    to="/account"
                    className="border-2 border-sky-200 duration-300 transition-colors rounded-full hover:border-sky-400"
                >
                    <Avatar image={user?.user_metadata.avatar} />
                </Link>

                <button
                    className="p-2 ml-1 text-sky-500"
                    onClick={() => openModal('logout')}
                >
                    <ArrowLeftEndOnRectangleIcon className="size-6" />
                </button>
            </div>
        </header>
    )
}

export default Header
