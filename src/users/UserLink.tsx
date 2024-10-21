import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { UserFriend } from '../types/types'
import { useEffect, useState } from 'react'

function UserLink({ user }: { user: UserFriend }) {
    const { username, avatar, id, status } = user
    const { userId } = useParams()
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        setIsActive(userId === id)
    }, [userId, id])

    return (
        <li className="w-full ">
            <Link
                className={`flex items-center gap-4 py-3 w-full  px-2 transition-colors duration-300 rounded-xl ${isActive ? 'bg-blue-200 hover:bg-blue-200' : 'bg-transparent hover:bg-blue-100'}`}
                to={`/chat/${id}`}
            >
                <Avatar type="big" image={avatar || '/default-user.webp'} />
                <div>
                    <p className="text-lg text-blue-800 leading-5 font-medium">
                        {username}
                    </p>
                    <p className="text-sm text-gray-500">{status}</p>
                </div>
            </Link>
        </li>
    )
}

export default UserLink
