import { useMemo } from 'react'
import Loader from '../components/Loader'
import { useUsers } from '../hooks/useUsers'
import UserLink from '../users/UserLink'

function AllFriends() {
    const { users, isLoading } = useUsers()
    const searchValue = ''

    const filteredUsers = useMemo(() => {
        return searchValue === ''
            ? users
            : users.filter((user) =>
                  user.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
    }, [users, searchValue])

    if (isLoading) return <Loader />

    return (
        <ul className="w-full ">
            {filteredUsers?.map((us) => <UserLink user={us} key={us.id} />)}
        </ul>
    )
}

export default AllFriends
