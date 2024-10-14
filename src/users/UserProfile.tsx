import Loader from '../components/Loader'
import { useUser } from './useUser'
import UserHeader from '../components/UserHeader'

import { useChatContext } from '../context/useChatContext'
import EditAvatat from './EditAvatat'
import { PencilIcon } from '@heroicons/react/24/outline'

function UserProfile() {
    const { user, isLoading } = useUser()
    const { openModal } = useChatContext()

    const image = user?.user_metadata.avatar || '/default-user.webp'
    const name = user?.user_metadata.username || 'User'
    const aboutme = user?.user_metadata.aboutme || ''

    if (isLoading) return <Loader />

    return (
        <>
            <UserHeader />
            <div className=" flex flex-col items-center py-12 ">
                <EditAvatat image={image} />

                <div className="mt-7 flex flex-col items-center px-12 text-center gap-4">
                    <p className="text-3xl  text-blue-900">{name}</p>
                    <div className="max-w-80 border border-stone-200 py-5 px-6 rounded-xl bg-slate-100 relative">
                        <p className="text-gray-900 ">{aboutme}</p>
                        <div className="w-9 h-9   rounded-full absolute -top-3 -right-3 bg-slate-100 object-cover object-center border border-stone-200">
                            <PencilIcon className="text-gray-900  p-1.5 " />
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200  w-full my-8"></div>
                <div className="flex flex-col text-xl   text-blue-900 ">
                    <button
                        className="p-2"
                        onClick={() => openModal('username')}
                    >
                        Zmień nazwę użytkownika
                    </button>
                    <button className="p-2 ">Zmień hasło</button>
                </div>
            </div>
        </>
    )
}

export default UserProfile
