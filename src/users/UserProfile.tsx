import Loader from '../components/Loader'
import { useUser } from '../hooks/useUser'
import UserHeader from '../components/UserHeader'

import { useChatContext } from '../context/useChatContext'
import EditAvatat from './EditAvatat'
import UserAboutMe from './UserAboutMe'
import { Cog8ToothIcon } from '@heroicons/react/16/solid'

function UserProfile() {
    const { user, isLoading } = useUser()
    const { openModal } = useChatContext()

    const image = user?.user_metadata.avatar || '/default-user.webp'

    if (isLoading) return <Loader />

    return (
        <>
            <UserHeader />
            <div className=" flex flex-col items-center py-16 relative flex-1">
                <button
                    className="absolute top-3 right-4 w-12 h-12 text-blue-900 p-2"
                    onClick={() => openModal('settings')}
                >
                    <Cog8ToothIcon />
                </button>
                <EditAvatat image={image} />
                <UserAboutMe />
                {/* <div className="border-t border-gray-200  w-full my-8"></div> */}
            </div>
        </>
    )
}

export default UserProfile
