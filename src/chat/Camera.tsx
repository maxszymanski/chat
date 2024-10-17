import { useRef, useState } from 'react'
import FileButton from '../components/FileButton'
import { CameraIcon } from '@heroicons/react/16/solid'

function Camera() {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [isCameraOpen, setIsCameraOpen] = useState(false)

    const handleOpenCamera = async () => {
        setIsCameraOpen(true)
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (err) {
            console.error('Error accessing camera: ', err)
        }
    }

    const handleTakePhoto = () => {
        if (canvasRef.current && videoRef.current) {
            const context = canvasRef.current.getContext('2d')
            context.drawImage(
                videoRef.current,
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            )
            const imageData = canvasRef.current.toDataURL('image/png')
            console.log('Captured image: ', imageData) // Możesz zapisać to zdjęcie lub wysłać je do backendu
        }
    }

    return (
        <div className="">
            {isCameraOpen ? (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        className="border-2 border-gray-500"
                        width="300"
                        height="300"
                    />
                    <canvas
                        ref={canvasRef}
                        width="300"
                        height="300"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={handleTakePhoto}
                        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                    >
                        Take Photo
                    </button>
                </>
            ) : (
                <FileButton onClick={handleOpenCamera}>
                    <CameraIcon className="h-7 w-7" />
                </FileButton>
            )}
        </div>
    )
}

export default Camera
