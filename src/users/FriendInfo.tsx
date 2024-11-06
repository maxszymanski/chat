import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import { useFriend } from '../hooks/useFriend'
import AddRemoveFav from '../components/AddRemoveFav'

function FriendInfo({ inProfile }: { inProfile: boolean }) {
    const { friend, isLoading } = useFriend()

    const image = friend?.avatar || '/default-user.webp'
    const name = friend?.username || ''
    const aboutme = friend?.aboutme || ''
    const status = friend?.status || ''
    const id = friend?.id || ''

    return (
        <div
            className={` relative flex-1 flex flex-col items-center justify-center py-6   ${inProfile ? '' : 'py-2  md:pt-0'} `}
        >
            {isLoading && inProfile ? (
                <Loader />
            ) : (
                <>
                    {friend && (
                        <div className=" border border-stone-200 bg-slate-100 text-gray-900 mb-10 rounded-xl overflow-hidden ">
                            <AddRemoveFav id={id} onClick={() => {}} />
                        </div>
                    )}
                    {friend ? (
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
                                className=" object-cover object-top rounded-full  w-36 h-36 xl:w-48 xl:h-48 border border-sky-200 hover:border-sky-400 duration-300 transition-colors"
                            />
                        </Link>
                    ) : (
                        <img
                            src={'/default-user.webp'}
                            alt={`zdjęcie anonimowego użytkownika`}
                            className=" object-cover object-top rounded-full  w-36 h-36 xl:w-48 xl:h-48 "
                        />
                    )}
                    <div className="mt-5 flex flex-col items-center px-12  gap-2">
                        <p className="text-3xl  text-sky-900 mb-3 text-center">
                            {name ? name : 'Nie znaleziono użytkownika'}
                        </p>

                        {friend ? (
                            <div className="max-w-80 border border-stone-200 py-3 px-8 rounded-xl bg-slate-100 relative mb-6  min-w-full text-center">
                                <p className="text-gray-900 text-sm">
                                    {status}
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-6 mt-6 xl:mt-3">
                                <p className="text-gray-900 text-base xl:text-lg">
                                    Sprawdź adres URL lub wróć do chatu.
                                </p>
                                <Link
                                    className=" block py-4 px-8 border-2 transition-colors duration-300 border-sky-500 bg-transparent rounded-full text-sky-500 hover:bg-sky-100 md:text-lg "
                                    to="/chat"
                                >
                                    Wróć do Chatu
                                </Link>
                            </div>
                        )}
                        {inProfile && friend && (
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
