import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useFriend } from '../hooks/useFriend'
import AddRemoveFav from '../components/AddRemoveFav'

function FriendInfo({ inProfile }: { inProfile: boolean }) {
    const { friend, isLoading } = useFriend()

    const image = friend?.avatar || '/default-user.webp'
    const name = friend?.username || 'User'
    const aboutme = friend?.aboutme || ''
    const status = friend?.status || ''
    const id = friend?.id || '1'

    return (
        <div
            className={` relative flex-1 flex flex-col items-center justify-center py-6   ${inProfile ? '' : 'py-2  md:pt-0'} `}
        >
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className=" border border-stone-200 bg-slate-100 text-gray-900 mb-10 rounded-xl overflow-hidden ">
                        <AddRemoveFav id={id} onClick={() => {}} />
                    </div>
                    <Link
                        to={
                            inProfile
                                ? `/account/picture/${id}`
                                : `/account/${id}`
                        }
                    >
                        <img
                            src={image || '/default-user.webp'}
                            alt={`Zdjęcie profilowe użytkownika ${name}`}
                            className=" object-cover object-top rounded-full  w-36 h-36 xl:w-48 xl:h-48 "
                        />
                    </Link>

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
                </>
            )}
        </div>
    )
}

export default FriendInfo
