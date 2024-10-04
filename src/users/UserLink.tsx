import { Link } from 'react-router-dom'
import Avatar from './Avatar'

function UserLink({ to, username }: { to: string; username: string }) {
    return (
        <li>
            <Link className="flex items-center gap-6 py-4 " to={`/chat/${to}`}>
                <Avatar />
                <p className="text-2xl text-blue-900">{username}</p>
            </Link>
        </li>
    )
}

export default UserLink
