import Loader from '../components/Loader'
import UserLink from '../users/UserLink'
import { useUsers } from '../users/useUsers'

function Friends() {
    const { users, isLoading } = useUsers()

    if (isLoading) return <Loader />

    return (
        <div className=" h-full p-6 pr-16 md:border-r border-stone-200  block w-full md:w-fit">
            <ul>
                {users?.map((us) => (
                    <UserLink to={us.id} key={us.id} username={us.username} />
                ))}
            </ul>
        </div>
    )
}

export default Friends
