import { ChevronLeftIcon } from '@heroicons/react/24/outline'
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
                <ChevronLeftIcon className="size-5 " />
            </button>
            <p className="text-sky-500 font-atma text-2xl sm:text-3xl ">
                Live Chat
            </p>
        </div>
    )
}

export default UserHeader
