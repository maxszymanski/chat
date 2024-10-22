import FileButton from '../components/FileButton'
import { CameraIcon } from '@heroicons/react/16/solid'

function Camera() {
    return (
        <FileButton onClick={() => {}}>
            <CameraIcon className="h-7 w-7" />
        </FileButton>
    )
}

export default Camera
