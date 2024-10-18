import Loader from '../components/Loader'
import UserLink from '../users/UserLink'
import { useUsers } from '../hooks/useUsers'
import { ChangeEvent, useMemo, useState } from 'react'

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

    return (
        <div className=" h-full py-4  md:border-r border-stone-200  block w-full md:max-w-[22rem] bg-slate-100 overflow-y-auto">
            <div className="max-w-80 mx-auto w-full px-4">
                <input
                    className=" w-full p-1.5 mt-2 mb-5 bg-slate-50 rounded-xl px-4 outline-none focus:border-blue-500 border border-blue-100 transition-colors duration-300 hover:border-blue-500 text-blue-900 placeholder:text-stone-950 placeholder:text-sm "
                    placeholder="Wyszukaj"
                    value={searchValue}
                    onChange={handleSearchUser}
                />
            </div>
            <ul className="w-full ">
                {filteredUsers?.map((us) => <UserLink user={us} key={us.id} />)}
            </ul>
        </div>
    )
}

export default Friends
