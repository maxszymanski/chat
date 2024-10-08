import { Link } from 'react-router-dom'
import { useChatContext } from '../context/useChatContext'
import Avatar from '../users/Avatar'
import { useUser } from '../users/useUser'

function Header() {
    const { handleToogleLogoutModal } = useChatContext()
    const { user } = useUser()
    console.log(user)

    const name = user?.user_metadata.name || 'User'

    return (
        <header className="border-b border-gray-200 p-4 md:p-6 flex items-center justify-between gap-4 bg-slate-100">
            <h2 className="text-blue-600 text-xl sm:text-2xl uppercase ">
                Live Chat
            </h2>
            <div className="flex items-center gap-4">
                <p className=" text-blue-500 text-lg font-medium">{name}</p>

                <Link to="/account">
                    <Avatar />
                </Link>

                <button className="p-2 ml-1" onClick={handleToogleLogoutModal}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6 text-blue-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                        />
                    </svg>
                </button>
            </div>
        </header>
    )
}

export default Header
