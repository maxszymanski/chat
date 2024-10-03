import { Link } from 'react-router-dom'

function UserLink({ to, username }: { to: string; username: string }) {
    return (
        <li>
            <Link className="flex items-center gap-6 py-4 " to={`/chat/${to}`}>
                <img
                    src="/default-user.webp"
                    className="w-9 h-9 object-cover rounded-full  bg-stone-50 border border-stone-50  overflow-hidden"
                />

                <p className="text-2xl text-blue-900">{username}</p>
            </Link>
        </li>
    )
}

export default UserLink
