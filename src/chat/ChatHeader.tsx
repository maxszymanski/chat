import { Link } from 'react-router-dom'
import { useFriend } from './useFriend'

function ChatHeader() {
    const { friend } = useFriend()

    return (
        <div className="flex w-full justify-between items-center px-5 pt-6 pb-3 border-b border-gray-200">
            <div className="flex justify-between items-center gap-4">
                <Link className="block" to="/chat">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                </Link>
                <img
                    src="/default-user.webp"
                    className="w-9 h-9 object-cover rounded-full  bg-stone-50 border border-stone-50  overflow-hidden"
                />
                <p className="font-semibold text-lg">
                    {friend?.username || 'Anonim'}
                </p>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 font-semibold"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                />
            </svg>
        </div>
    )
}

export default ChatHeader
