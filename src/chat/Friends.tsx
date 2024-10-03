import Loader from '../components/Loader'
import UserLink from '../users/UserLink'
import { useUsers } from '../users/useUsers'

function Friends() {
    const { users, isLoading } = useUsers()

    if (isLoading) return <Loader />

    return (
        <div className="h-dvh p-6 pr-16 md:border-r border-stone-200 hidden md:block">
            <h2 className="text-blue-600 text-2xl uppercase mb-7">Live Chat</h2>
            <ul>
                {users?.map((us) => (
                    <UserLink to={us.id} key={us.id} username={us.username} />
                ))}
            </ul>
        </div>
    )
}

export default Friends
