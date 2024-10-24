import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { UserFriend } from '../types/types'
import { useEffect, useState } from 'react'
import LinksModal from '../components/LinksModal'

function UserLink({ user }: { user: UserFriend }) {
    const [openModal, setOpenModal] = useState(false)
    const { username, avatar, id, status } = user
    const { userId } = useParams()
    const [isActive, setIsActive] = useState(false)

    // const { messages } = useMessages(id)

    useEffect(() => {
        setIsActive(userId === id)
    }, [userId, id])

    const openLinkModal = (value: string | null) => {
        setOpenModal(value === id)
    }
    const closeLinkModal = () => {
        setOpenModal(false)
    }

    return (
        <li
            className={`relative w-full justify-center flex items-center gap-1.5 px-3 transition-colors duration-300 rounded-xl ${isActive ? 'bg-blue-200 hover:bg-blue-200' : 'bg-transparent hover:bg-blue-100'} `}
        >
            <button
                value={id}
                onClick={(e) =>
                    openLinkModal((e.target as HTMLButtonElement).value)
                }
            >
                <Avatar type="big" image={avatar || '/default-user.webp'} />
            </button>
            {openModal && <LinksModal id={id} onClick={closeLinkModal} />}
            <Link
                className={`flex items-center gap-4 py-3 flex-1  px-2 `}
                to={`/chat/${id}`}
            >
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
