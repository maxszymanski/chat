import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import { UserFriend } from '../types/types'

function UserLink({ user }: { user: UserFriend }) {
    const { username, avatar, id, status } = user
    return (
        <li>
            <Link className="flex items-center gap-4 py-4 " to={`/chat/${id}`}>
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
