import Loader from '../components/Loader'
import UserLink from '../users/UserLink'
import { useUsers } from '../users/useUsers'

function FriendsDesktop() {
    const { users, isLoading } = useUsers()

    if (isLoading) return <Loader />

    return (
        <>
            <main className="h-screen  md:flex justify-center items-center flex-1  text-center hidden ">
                <div>
                    <p className="text-xl text-blue-500 py-5">
                        "Nic tu się nie dzieje...{' '}
                    </p>
                    <p className="text-xl text-blue-500 py-5">
                        Wybierz rozmówcę i rozkręć konwersację!
                    </p>
                </div>
            </main>
            <div className="h-dvh p-6 pr-16 md:border-r border-stone-200 md:hidden block w-full">
                <h2 className="text-blue-600 text-2xl uppercase mb-7">
                    Live Chat
                </h2>
                <ul>
                    {users?.map((us) => (
                        <UserLink
                            to={us.id}
                            key={us.id}
                            username={us.username}
                        />
                    ))}
                </ul>
            </div>
        </>
    )
}

export default FriendsDesktop
