import { useFriend } from '../hooks/useFriend'

import UserHeader from '../components/UserHeader'

function FullPageImage() {
    const { friend } = useFriend()

    const image = friend?.avatar || '/default-user.webp'
    const username = friend?.username || ''

    return (
        <>
            <UserHeader />
            <div className="flex justify-center flex-1 items-center p-8 w-full max-w-7xl mx-auto ">
                <img
                    src={image}
                    className=" max-h-screen object-contain rounded-lg  mx-auto max-w-full"
                    alt={`Zdjęcie profilowe użytkownika ${username}`}
                />
            </div>
        </>
    )
}

export default FullPageImage
