import Loader from '../components/Loader'
import { useUser } from './useUser'
import UserHeader from '../components/UserHeader'
import { CameraIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'
import { useChatContext } from '../context/useChatContext'
import { useUpdateAvatar } from './UseUpdateAvatar'

function UserProfile() {
    const { user, isLoading } = useUser()
    const { openModal } = useChatContext()
    const { updateAvatar, isUpdatingAvatar } = useUpdateAvatar()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const image = user?.user_metadata.avatar || '/default-user.webp'
    const name = user?.user_metadata.username || 'User'
    const aboutme = user?.user_metadata.aboutme || ''

    if (isLoading) return <Loader />
    if (isUpdatingAvatar) return <Loader />

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            updateAvatar(file)
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }
    console.log(user)

    return (
        <>
            <UserHeader />
            <div className=" flex flex-col items-center py-12 ">
                <div
                    className="relative border rounded-full  w-36 h-36 xl:w-48 xl:h-48 border-stone-200 cursor-pointer"
                    onClick={handleImageClick}
                >
                    <img
                        src={image || '/default-user.webp'}
                        className=" object-cover object-top rounded-full  w-36 h-36 xl:w-48 xl:h-48"
                    />
                    <div className="w-10 h-10  rounded-full absolute bottom-0 right-1 border-4 border-gray-200 ">
                        <CameraIcon className="text-white bg-gray-300  rounded-full p-2 pointer-events-none" />
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
                <div className="mt-7 flex flex-col items-center px-12 text-center gap-4">
                    <p className="text-3xl  text-blue-900">{name}</p>
                    <div className="max-w-80 border border-stone-200 py-5 px-6 rounded-xl bg-slate-100">
                        <p className="text-gray-900 ">{aboutme}</p>
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
