import Loader from '../components/Loader'
import UserLink from '../users/UserLink'
import { useUsers } from '../hooks/useUsers'

function Friends() {
    const { users, isLoading } = useUsers()

    if (isLoading) return <Loader />

    return (
        <div className=" h-full p-4  md:border-r border-stone-200  block w-full md:w-96 bg-slate-100">
            <ul>{users?.map((us) => <UserLink user={us} key={us.id} />)}</ul>
        </div>
    )
}

export default Friends
