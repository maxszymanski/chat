import Loader from '../components/Loader'
import { useUser } from '../hooks/useUser'
import UserHeader from '../components/UserHeader'

import { useChatContext } from '../context/useChatContext'
import EditAvatat from './EditAvatat'
import UserAboutMe from './UserAboutMe'
import { Cog8ToothIcon } from '@heroicons/react/16/solid'
import Settings from '../components/Settings'

function UserProfile() {
    const { user, isLoading } = useUser()
    const { openModal } = useChatContext()

    const image = user?.user_metadata.avatar || '/default-user.webp'

    if (isLoading) return <Loader />

    return (
        <>
            <UserHeader />
            <div className="py-16 relative flex-1 md:flex  md:justify-evenly md:gap-10 ">
                <button
                    className="absolute top-3 right-4 w-12 h-12 text-blue-900 p-2 md:hidden"
                    onClick={() => openModal('settings')}
                >
                    <Cog8ToothIcon />
                </button>
                <div className="flex flex-col items-center md:justify-center">
                    <EditAvatat image={image} />
                    <UserAboutMe />
                </div>
                <div className="hidden md:flex  rounded-xl md:justify-center md:items-center">
                    <Settings />
                </div>
            </div>
        </>
    )
}

export default UserProfile
