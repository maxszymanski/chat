import { useMemo } from 'react'
import Loader from '../components/Loader'
import { useUsers } from '../hooks/useUsers'
import UserLink from '../users/UserLink'
import NoUsersSearch from '../components/NoUsersSearch'

function AllFriends({ searchValue }: { searchValue: string }) {
    const { users, isLoading } = useUsers()

    const filteredUsers = useMemo(() => {
        return searchValue === ''
            ? users
            : users.filter((user) =>
                  user.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
    }, [users, searchValue])
    const noUsers = filteredUsers.length <= 0

    if (!isLoading && noUsers) return <NoUsersSearch />
    if (isLoading) return <Loader />

    return (
        <>
            {!noUsers && (
                <ul className="w-full ">
                    {filteredUsers?.map((friend) => {
                        return <UserLink user={friend} key={friend.id} />
                    })}
                </ul>
            )}
        </>
    )
}

export default AllFriends
