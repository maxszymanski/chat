import { useMemo } from 'react'
import Loader from '../components/Loader'
import { useFavoriteUsers } from '../hooks/useFavoriteUsers'
import UserLink from '../users/UserLink'
import NoUsersSearch from '../components/NoUsersSearch'
import NoFavUsers from '../components/NoFavUsers'

function FavoriteFriends({ searchValue }: { searchValue: string }) {
    const { favUsers, isLoadingFavUsers } = useFavoriteUsers()

    const filteredUsers = useMemo(() => {
        return searchValue === ''
            ? favUsers
            : favUsers.filter((user) =>
                  user.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
    }, [favUsers, searchValue])

    const noUsers = filteredUsers.length == 0 && favUsers.length > 0

    if (isLoadingFavUsers) return <Loader />
    if (noUsers) return <NoUsersSearch />
    if (favUsers.length == 0) return <NoFavUsers />

    return (
        <ul className="w-full ">
            {filteredUsers?.map((us) => <UserLink user={us} key={us.id} />)}
        </ul>
    )
}

export default FavoriteFriends
