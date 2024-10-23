import { useMemo } from 'react'
import Loader from '../components/Loader'
import { useFavoriteUsers } from '../hooks/useFavoriteUsers'
import UserLink from '../users/UserLink'

function FavoriteFriends() {
    const { favUsers, isLoadingFavUsers } = useFavoriteUsers()

    const searchValue = ''

    const filteredUsers = useMemo(() => {
        return searchValue === ''
            ? favUsers
            : favUsers.filter((user) =>
                  user.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
    }, [favUsers, searchValue])

    if (isLoadingFavUsers) return <Loader />

    console.log(favUsers)

    return (
        <ul className="w-full ">
            {filteredUsers?.map((us) => <UserLink user={us} key={us.id} />)}
        </ul>
    )
}

export default FavoriteFriends
