import Loader from '../components/Loader'
import { useUser } from './useUser'
import UserHeader from '../components/UserHeader'
import { CameraIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'
import { useUpdateUser } from './useUpdateUser'

function UserProfile() {
    const { user, isLoading } = useUser()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const { updateUser, isUpdatingName } = useUpdateUser()
    const image =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwirUU_VrMUBFgATKSIndInyMN7Ae9BpK_chyyFbTXvMsrIZRHnKBk0BN2WtnRCI020IE&usqp=CAU'
    const name = user?.user_metadata.name || 'User'

    if (isLoading) return <Loader />
    if (isUpdatingName) return <Loader />

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // const imageUrl = URL.createObjectURL(file)
            // setImage(imageUrl) // Set the selected image URL for preview
            console.log('wysłane')
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click() // Open file dialog
    }

    return (
        <>
            <UserHeader />
            <div className=" flex flex-col items-center py-12 px-8">
                <div className="relative border rounded-full  w-36 h-36 border-stone-200 cursor-pointer">
                    <img
                        src={image || '/default-user.webp'}
                        className=" object-cover rounded-full  w-36 h-36"
                        onClick={handleImageClick}
                    />
                    <div className="w-10 h-10  rounded-full absolute bottom-0 right-1 border-4 border-gray-200 pointer-events-none">
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
                <p className="text-3xl my-7 text-blue-900">{name}</p>
                <div className="flex flex-col text-xl mt-7  text-blue-900">
                    <button className="p-2" onClick={() => updateUser('Max')}>
                        Zmień dane
                    </button>
                    <button className="p-2 ">Zmień hasło</button>
                </div>
            </div>
        </>
    )
}

export default UserProfile
