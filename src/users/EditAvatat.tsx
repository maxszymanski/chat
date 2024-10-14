import { useRef } from 'react'
import { useUpdateAvatar } from './UseUpdateAvatar'
import Loader from '../components/Loader'
import { CameraIcon } from '@heroicons/react/24/solid'

function EditAvatat({ image }: { image: string }) {
    const { updateAvatar, isUpdatingAvatar } = useUpdateAvatar()
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            updateAvatar(file)
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    if (isUpdatingAvatar) return <Loader />

    return (
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
    )
}

export default EditAvatat
