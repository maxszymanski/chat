import {
    CameraIcon,
    MicrophoneIcon,
    PhotoIcon,
} from '@heroicons/react/16/solid'
import FileButton from '../components/FileButton'
import { useRef } from 'react'

function FileArea() {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // updateAvatar(file)
            console.log(file)
        }
    }

    const handleImageClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="flex items-center gap-1">
            <FileButton onClick={() => {}}>
                <CameraIcon className="h-7 w-7" />
            </FileButton>
            <FileButton onClick={handleImageClick}>
                <PhotoIcon className="h-6 w-6" />
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </FileButton>
            <FileButton onClick={() => {}}>
                <MicrophoneIcon className="h-6 w-6" />
            </FileButton>
        </div>
    )
}

export default FileArea
