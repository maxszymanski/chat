import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { UserFriend } from '../types/types'
import { useEffect, useState } from 'react'
import LinksModal from '../components/LinksModal'
import { useMessages } from '../hooks/useMessages'
import Loader from '../components/Loader'
import { format, parseISO, isToday } from 'date-fns'
import { pl } from 'date-fns/locale'

function UserLink({ user }: { user: UserFriend }) {
    const [openModal, setOpenModal] = useState(false)
    const { username, avatar, id, status } = user
    const { userId } = useParams()
    const [isActive, setIsActive] = useState(false)
    const { messages, isLoading } = useMessages(id)

    useEffect(() => {
        setIsActive(userId === id)
    }, [userId, id])

    const openLinkModal = (value: string | null) => {
        setOpenModal(value === id)
    }
    const closeLinkModal = () => {
        setOpenModal(false)
    }

    if (isLoading) return <Loader />

    const lastMessage = messages[messages.length - 1]?.content
    const fromFriendMessage = messages[messages.length - 1]?.sender_id === id
    const isMessageNotSeen =
        messages[messages.length - 1]?.read_status === false &&
        fromFriendMessage

    const isSvg = lastMessage?.startsWith('<svg')
    const messageCreated = messages[messages.length - 1]?.created_at

    const date = messageCreated && parseISO(messageCreated)

    const today = date && isToday(date)

    const formattedDay = date && format(date, 'EEEE', { locale: pl })
    const formattedTime = date && format(date, 'HH:mm')

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
                className={`flex items-center gap-4 py-3 flex-1  px-2 justify-between `}
                to={`/chat/${id}`}
            >
                <div className="flex flex-col gap-1.5">
                    <p
                        className={`text-lg text-blue-800  leading-5  ${isMessageNotSeen ? 'font-bold' : ' font-medium'}`}
                    >
                        {username}
                    </p>
                    {lastMessage ? (
                        <div
                            className={`flex items-center justify-between gap-2 w-full flex-1 text-sm   ${isMessageNotSeen ? 'font-bold text-gray-950' : ' font-normal text-gray-600'}`}
                        >
                            {' '}
                            <p className="overflow-hidden w-fit">
                                {!fromFriendMessage && (
                                    <span className="mr-1  ">Ty:</span>
                                )}
                                {isSvg ? '👍' : `${lastMessage}`}
                            </p>
                            <p className="text-xs text-nowrap  w-max">
                                {today ? formattedTime : `${formattedDay}`}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm mt-1 text-gray-500">{status}</p>
                    )}
                </div>
            </Link>
        </li>
    )
}

export default UserLink
