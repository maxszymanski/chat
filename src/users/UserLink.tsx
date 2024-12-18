import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { UserFriend } from '../types/types'
import { useEffect, useRef, useState } from 'react'
import LinksModal from '../components/LinksModal'
import { useMessages } from '../hooks/useMessages'
import Loader from '../components/Loader'
import { format, parseISO, isToday, isBefore, subDays } from 'date-fns'
import { pl } from 'date-fns/locale'
import newMessageSound from '../chat/plum.mp3'
import { useUpdateAlertStatus } from '../hooks/useUpdateAlertStatus'

function UserLink({ user }: { user: UserFriend }) {
    const [openModal, setOpenModal] = useState(false)
    const { updateMessageAlertStatus } = useUpdateAlertStatus()
    const { username, avatar, id, status } = user
    const { userId } = useParams()
    const [isActive, setIsActive] = useState(false)
    const { messages, isLoadingMessages } = useMessages(id)
    const audioRef = useRef(new Audio(newMessageSound))

    useEffect(() => {
        setIsActive(userId === id)
    }, [userId, id])

    useEffect(() => {
        const lastMessage = messages[messages.length - 1]
        if (
            lastMessage?.sender_id === id &&
            lastMessage?.read_status === false &&
            lastMessage?.alert === false &&
            messages.length > 0
        ) {
            audioRef.current.play()
            const messageToUpdate = { id: lastMessage.id, alert: true }

            updateMessageAlertStatus(messageToUpdate)
        }
    }, [messages, messages.length, id, updateMessageAlertStatus])

    const openLinkModal = (value: string | null) => {
        setOpenModal(value === id)
    }
    const closeLinkModal = () => {
        setOpenModal(false)
    }

    if (isLoadingMessages) return <Loader />

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
    const isFile =
        lastMessage?.startsWith('http') &&
        lastMessage?.includes('supabase.co/storage')

    const date = messageCreated && parseISO(messageCreated)

    const today = date && isToday(date)
    const olderThanWeek = date && isBefore(date, subDays(new Date(), 7))

    const formattedDay =
        date && format(date, 'EEEE', { locale: pl }).slice(0, 3)
    const formattedTime = date && format(date, 'HH:mm')
    const dayOfMonth = date && format(date, 'd')
    const month = date && format(date, 'MMMM', { locale: pl }).slice(0, 3)
    const formattedDate = `${dayOfMonth} ${month}.`

    const showMessageTime =
        today && !olderThanWeek
            ? formattedTime
            : !today && !olderThanWeek
              ? `${formattedDay}. ${formattedTime}`
              : !today && olderThanWeek
                ? formattedDate
                : null

    return (
        <li
            className={`relative w-full    flex items-center gap-1.5 px-3 transition-colors duration-300 rounded-xl ${isActive ? 'bg-sky-200 hover:bg-sky-200' : 'bg-transparent hover:bg-sky-100'} `}
        >
            <button
                className="shrink-0  duration-300 transition-colors rounded-full hover:border-sky-400 border border-sky-200"
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
                                {isSvg
                                    ? '👍'
                                    : isFile
                                      ? `${!fromFriendMessage ? 'Wysłałeś(aś) zdjęcie' : `${username} wysłał(a) zdjęcie`}`
                                      : `${lastMessage}`}
                            </p>
                            <p className="text-xs text-nowrap  ">
                                {showMessageTime}
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
