import Loader from '../components/Loader'

import UserHeader from '../components/UserHeader'
import { useFriend } from '../chat/useFriend'

function PublicProfile() {
    const { friend, isLoading } = useFriend()

    const image = friend?.avatar || '/default-user.webp'
    const name = friend?.username || 'User'
    const aboutme = friend?.aboutme || ''

    if (isLoading) return <Loader />

    return (
        <>
            <UserHeader />
            <div className=" flex flex-col items-center py-12 flex-1">
                <img
                    src={image || '/default-user.webp'}
                    className=" object-cover object-top rounded-full  w-36 h-36 xl:w-48 xl:h-48 "
                />

                <div className="mt-7 flex flex-col items-center px-12 text-center gap-4">
                    <p className="text-3xl  text-blue-900 mb-3">{name}</p>
                    <div className="max-w-80 border border-stone-200 py-5 px-6 rounded-xl bg-slate-100">
                        <p className="text-gray-900 ">{aboutme}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PublicProfile
