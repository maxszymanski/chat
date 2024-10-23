import Loader from '../components/Loader'
import UserLink from '../users/UserLink'
import { useUsers } from '../hooks/useUsers'
import { ChangeEvent, useMemo, useState } from 'react'
import UserSearch from '../components/UserSearch'
import NoUsersSearch from '../components/NoUsersSearch'
import FriendsTabs from '../components/FriendsTabs'
import { useChatContext } from '../context/useChatContext'
import FavoriteFriends from './FavoriteFriends'
import { useFavoriteUsers } from '../hooks/useFavoriteUsers'
import { Outlet } from 'react-router-dom'
import AllFriends from './AllFriends'

function Friends() {
    const { users, isLoading } = useUsers()
    const { favUsers, isLoadingFavUsers } = useFavoriteUsers()
    const [searchValue, setSearchValue] = useState('')
    const { activeTab } = useChatContext()

    const allUsersOpen = activeTab === 'all'
    const favUsersOpen = activeTab === 'fav'

    const handleSearchUser = (e: ChangeEvent) => {
        setSearchValue((e.target as HTMLInputElement).value)
    }
    console.log(allUsersOpen)

    const filteredUsers = useMemo(() => {
        return searchValue === ''
            ? users
            : users.filter((user) =>
                  user.username
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
              )
    }, [users, searchValue])
    if (isLoading || isLoadingFavUsers) return <Loader />

    const noUsers = filteredUsers.length <= 0

    return (
        <div
            className={` h-full py-4  sm:border-r border-stone-200  block w-full sm:max-w-[22rem] bg-slate-100 overflow-y-auto relative`}
        >
            <UserSearch value={searchValue} onClick={handleSearchUser} />
            <FriendsTabs />

            {allUsersOpen && <AllFriends />}
            {favUsersOpen && <FavoriteFriends />}
            {noUsers && <NoUsersSearch />}
        </div>
    )
}

export default Friends
