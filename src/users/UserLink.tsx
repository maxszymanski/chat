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
    const isFriendSeeMessage =
        messages[messages.length - 1]?.read_status === true &&
        !fromFriendMessage
    const messageCreated = messages[messages.length - 1]?.created_at

    const isSvg = lastMessage?.startsWith('<svg')

    const date = messageCreated && parseISO(messageCreated)

    const today = date && isToday(date)

    const formattedDay =
        date && format(date, 'EEEE', { locale: pl }).slice(0, 3)
    const formattedTime = date && format(date, 'HH:mm')

    return (
        <li
            className={`relative w-full    flex items-center gap-1.5 px-3 transition-colors duration-300 rounded-xl ${isActive ? 'bg-sky-200 hover:bg-sky-200' : 'bg-transparent hover:bg-sky-100'} `}
        >
            <button
                className="shrink-0 border-2 border-transparent duration-300 transition-colors rounded-full hover:border-sky-400 "
                value={id}
                onClick={(e) =>
                    openLinkModal((e.target as HTMLButtonElement).value)
                }
            >
                <Avatar type="big" image={avatar || '/default-user.webp'} />
            </button>
            {openModal && <LinksModal id={id} onClick={closeLinkModal} />}
            <Link
                className={`flex items-center gap-4 py-3  w-4/5 grow-0  px-2 justify-between `}
                to={`/chat/${id}`}
            >
                <div className="flex flex-col gap-1 max-w-full">
                    <p
                        className={`text-lg text-sky-950  leading-5  ${isMessageNotSeen ? 'font-bold' : ' font-medium'}`}
                    >
                        {username}
                    </p>
                    {lastMessage ? (
                        <div
                            className={`flex items-center flex-1 gap-3  text-sm   ${isMessageNotSeen ? 'font-bold text-gray-950' : ' font-normal text-gray-600'}`}
                        >
                            {' '}
                            <p className="overflow-hidden break-words whitespace-nowrap overflow-ellipsis ">
                                {!fromFriendMessage && (
                                    <span className="mr-1  ">Ty:</span>
                                )}
                                {isSvg ? '👍' : `${lastMessage}`}
                            </p>
                            <p className="text-xs text-nowrap  ">
                                {today ? formattedTime : `${formattedDay}`}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm  text-gray-500 overflow-hidden break-words whitespace-nowrap overflow-ellipsis ">
                            {status}
                        </p>
                    )}
                </div>
                {isFriendSeeMessage && (
                    <div className="shrink-0">
                        <Avatar
                            type="mini"
                            image={avatar || '/default-user.webp'}
                        />
                    </div>
                )}
            </Link>
        </li>
    )
}

export default UserLink
