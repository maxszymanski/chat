import Loader from '../components/Loader'
import { useFriend } from '../hooks/useFriend'

function FriendInfo({ inProfile }: { inProfile: boolean }) {
    const { friend, isLoading } = useFriend()

    const image = friend?.avatar || '/default-user.webp'
    const name = friend?.username || 'User'
    const aboutme = friend?.aboutme || ''
    const status = friend?.status || ''

    if (isLoading) return <Loader />

    return (
        <div className="  flex flex-col items-center py-16 flex-1">
            <img
                src={image || '/default-user.webp'}
                className=" object-cover object-top rounded-full  w-36 h-36 xl:w-48 xl:h-48 "
            />

            <div className="mt-5 flex flex-col items-center px-12  gap-2">
                <p className="text-3xl  text-blue-900 mb-3 text-center">
                    {name}
                </p>
                <div className="max-w-80 border border-stone-200 py-3 px-8 rounded-xl bg-slate-100 relative mb-6  min-w-full text-center">
                    <p className="text-gray-900 text-sm">{status}</p>
                </div>
                {inProfile && (
                    <div className="max-w-80 border border-stone-200 py-5  px-8 rounded-xl bg-slate-100 relative min-w-full text-center min-h-28">
                        <p className="text-gray-900 ">{aboutme}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FriendInfo
