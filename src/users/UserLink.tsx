import { Link } from 'react-router-dom'
import Avatar from './Avatar'

function UserLink({
    to,
    username,
    image,
}: {
    to: string
    username: string
    image: string
}) {
    return (
        <li>
            <Link className="flex items-center gap-4 py-4 " to={`/chat/${to}`}>
                <Avatar type="big" image={image} />
                <div>
                    <p className="text-lg text-blue-800 leading-5 font-medium">
                        {username}
                    </p>
                    <p className="text-sm text-gray-500">
                        Nowy na czacie – poznaj mnie!
                    </p>
                </div>
            </Link>
        </li>
    )
}

export default UserLink
