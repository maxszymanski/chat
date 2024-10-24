import { ChangeEvent, useState } from 'react'
import UserSearch from '../components/UserSearch'
import FriendsTabs from '../components/FriendsTabs'
import { useChatContext } from '../context/useChatContext'
import FavoriteFriends from './FavoriteFriends'
import AllFriends from './AllFriends'

function Friends() {
    const [searchValue, setSearchValue] = useState('')
    const { activeTab } = useChatContext()

    const allUsersOpen = activeTab === 'all'
    const favUsersOpen = activeTab === 'fav'

    const handleSearchUser = (e: ChangeEvent) => {
        setSearchValue((e.target as HTMLInputElement).value)
    }

    return (
        <div
            className={` h-full py-4  sm:border-r border-stone-200  block w-full sm:max-w-[22rem] bg-slate-100 overflow-y-auto relative`}
        >
            <UserSearch value={searchValue} onClick={handleSearchUser} />
            <FriendsTabs />

            {allUsersOpen && <AllFriends searchValue={searchValue} />}
            {favUsersOpen && <FavoriteFriends searchValue={searchValue} />}
        </div>
    )
}

export default Friends
