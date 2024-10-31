import {
    CameraIcon,
    MicrophoneIcon,
    PhotoIcon,
} from '@heroicons/react/16/solid'
import FileButton from '../components/FileButton'
import { useRef } from 'react'

interface FileAreaProps {
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}

const FileArea: React.FC<FileAreaProps> = ({ setFile }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) setFile(selectedFile)
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
