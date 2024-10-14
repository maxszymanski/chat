import { useNavigate, useParams } from 'react-router-dom'

function UserHeader() {
    const navigate = useNavigate()
    const pathname = useParams()

    const handleNavigate = () => {
        if (pathname.userId) {
            navigate(-1)
        } else {
            navigate('/chat')
        }
    }

    return (
        <div className="flex w-full  items-center px-5 pt-4 pb-3 border-b border-gray-200 gap-3 bg-slate-100 h-[73px]">
            <button className="block p-2" onClick={handleNavigate}>
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
            </button>
            <p className="text-blue-600 text-xl sm:text-2xl uppercase ">
                Live Chat
            </p>
        </div>
    )
}

export default UserHeader
