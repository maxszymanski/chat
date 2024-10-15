import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { useChatContext } from '../context/useChatContext'
import { useUser } from '../hooks/useUser'
import { PencilIcon } from '@heroicons/react/24/outline'

function UserAboutMe() {
    const { user } = useUser()
    const { openModal } = useChatContext()

    const name = user?.user_metadata.username || 'User'
    const aboutme = user?.user_metadata.aboutme || ''
    const status = user?.user_metadata.status || ''

    return (
        <div className="mt-5 flex flex-col items-center px-12  gap-3 w-full">
            <p className="text-3xl  text-blue-900 text-center">{name}</p>

            <div className="max-w-72 border border-stone-200 py-3 px-8 rounded-xl bg-slate-100 relative mb-6  w-full">
                <p className="text-gray-900 text-sm">{status}</p>
                <button
                    className="w-9 h-9   rounded-full absolute -top-3 -right-3 bg-slate-100 object-cover object-center border border-stone-200"
                    onClick={() => openModal('status')}
                >
                    <ChatBubbleLeftEllipsisIcon className="text-gray-900  p-1.5 " />
                </button>
            </div>
            <div className="max-w-72 border border-stone-200 py-5  px-8 rounded-xl bg-slate-100 relative w-full text-center min-h-28">
                <p className="text-gray-900 ">{aboutme}</p>
                <button
                    className="w-9 h-9   rounded-full absolute -top-3 -right-3 bg-slate-100 object-cover object-center border border-stone-200"
                    onClick={() => openModal('about')}
                >
                    <PencilIcon className="text-gray-900  p-1.5 " />
                </button>
            </div>
        </div>
    )
}

export default UserAboutMe
