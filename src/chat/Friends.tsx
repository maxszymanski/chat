import Loader from '../components/Loader'
import UserLink from '../users/UserLink'
import { useUsers } from '../hooks/useUsers'
import { ChangeEvent, useMemo, useState } from 'react'
import UserSearch from '../components/UserSearch'
import NoUsersSearch from '../components/NoUsersSearch'

function Friends() {
    const { users, isLoading } = useUsers()
    const [searchValue, setSearchValue] = useState('')

    const handleSearchUser = (e: ChangeEvent) => {
        setSearchValue((e.target as HTMLInputElement).value)
    }

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

    const noUsers = filteredUsers.length <= 0

    return (
        <div
            className={` h-full py-4  md:border-r border-stone-200  block w-full md:max-w-[22rem] bg-slate-100 overflow-y-auto relative`}
        >
            <UserSearch value={searchValue} onClick={handleSearchUser} />
            {!noUsers ? (
                <ul className="w-full ">
                    {filteredUsers?.map((us) => (
                        <UserLink user={us} key={us.id} />
                    ))}
                </ul>
            ) : (
                <NoUsersSearch />
            )}
        </div>
    )
}

export default Friends
