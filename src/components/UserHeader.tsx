import { Link } from 'react-router-dom'

function UserHeader() {
    return (
        <div className="flex w-full  items-center px-5 pt-4 pb-3 border-b border-gray-200 gap-3 bg-slate-100">
            <Link className="block p-2" to="/chat">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 mb-0.5 "
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                </svg>
            </Link>
            <p className="text-blue-600 text-xl sm:text-2xl uppercase ">
                Live Chat
            </p>
        </div>
    )
}

export default UserHeader
