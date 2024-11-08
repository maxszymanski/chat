import { Link } from 'react-router-dom'
import { useMessages } from '../hooks/useMessages'
import { useUser } from '../hooks/useUser'
import parse from 'html-react-parser'

import { Message as MessageType } from '../types/types'
import { useFriend } from '../hooks/useFriend'
import {
    differenceInMinutes,
    format,
    isBefore,
    isToday,
    parseISO,
    subDays,
} from 'date-fns'
import { pl } from 'date-fns/locale'
import { memo, useMemo, useState } from 'react'

const Message = memo(function Message({
    message,
    index,
}: {
    message: MessageType
    index: number
}) {
    const [isOpenDate, setIsOpenDate] = useState(false)
    const { messages } = useMessages()
    const { user } = useUser()
    const { friend } = useFriend()

    const friendAvatar = friend?.avatar || '/default-user.webp'

    const isLastFromUser =
        index === messages.length - 1 ||
        messages[index + 1].sender_id !== message.sender_id

    const isLastFromMy =
        index === messages.length - 1 && message.sender_id === user?.id

    const previousSenderId = index > 0 ? messages[index - 1]?.sender_id : null
    const isSameSenderAsPrevious = previousSenderId === message.sender_id

    const commonClass = ` p-3 max-w-64  rounded-2xl  text-start  w-fit ${
        message.receiver_id === user?.id ? 'bg-white ' : 'bg-sky-300 '
    }`

    const messageCreated = message?.created_at
    const previousMessageCreated =
        index > 0 ? messages[index - 1]?.created_at : null

    const fromFriendMessage =
        messages[messages.length - 1]?.sender_id === friend?.id

    const isFriendSeeMessage =
        messages[messages.length - 1]?.read_status === true &&
        !fromFriendMessage

    const currentDate = messageCreated && parseISO(messageCreated)
    const previousDate =
        previousMessageCreated && parseISO(previousMessageCreated)

    const showTimeDivider =
        isLastFromUser &&
        (!previousDate || differenceInMinutes(currentDate, previousDate) >= 10)

    const today = currentDate && isToday(currentDate)
    const olderThanWeek =
        currentDate && isBefore(currentDate, subDays(new Date(), 7))

    const formattedDay =
        currentDate && format(currentDate, 'EEEE', { locale: pl }).slice(0, 3)
    const formattedTime = currentDate && format(currentDate, 'HH:mm')

    const dayOfMonth = currentDate && format(currentDate, 'd')
    const month =
        currentDate && format(currentDate, 'MMMM', { locale: pl }).slice(0, 3)
    const formattedDateWithTime = `${dayOfMonth} ${month}. ${formattedTime}`

    const showMessageTime =
        today && !olderThanWeek
            ? formattedTime
            : !today && !olderThanWeek
              ? `${formattedDay}. ${formattedTime}`
              : !today && olderThanWeek
                ? formattedDateWithTime
                : null

    const isSvg = useMemo(
        () => message.content.startsWith('<svg'),
        [message.content]
    )
    const isLink = useMemo(
        () =>
            message.content.startsWith('http') &&
            !message.content.includes('supabase.co/storage'),
        [message.content]
    )
    const isFile = useMemo(
        () =>
            message.content.startsWith('http') &&
            message.content.includes('supabase.co/storage'),
        [message.content]
    )

    return (
        <li className={isSameSenderAsPrevious ? 'mt-0' : 'mt-4'}>
            <div
                className={`text-xs text-center items-center gap-4 py-10  ${showTimeDivider ? 'flex' : 'hidden'} `}
            >
                <div className="h-[1px] w-full bg-stone-200"></div>
                <p className="text-nowrap">{showMessageTime}</p>
                <div className="h-[1px] w-full bg-stone-200"></div>
            </div>

            <div
                className={`flex gap-2 items-end break-words  ${
                    message.receiver_id === user?.id
                        ? 'self-start flex-row '
                        : 'self-end  flex-row-reverse'
                }`}
            >
                {message.sender_id === friend?.id && (
                    <img
                        src={friendAvatar}
                        className={`w-7 h-7  rounded-full object-top object-cover   ${isLastFromUser ? 'opacity-100' : 'opacity-0'} `}
                    />
                )}
                <div
                    className={` cursor-pointer ${isSvg ? 'h-10 w-10' : ''} `}
                    onClick={() => setIsOpenDate((is) => !is)}
                >
                    {isSvg ? (
                        <span className="size-10 text-sky-300">
                            {parse(`${message.content}`)}
                        </span>
                    ) : isLink ? (
                        <Link
                            target="_blank"
                            rel="noopener"
                            to={message.content}
                            className={`${commonClass} underline`}
                        >
                            {message.content}
                        </Link>
                    ) : isFile ? (
                        <div
                            className={`max-w-60 rounded-lg  overflow-hidden bg-transparent ${
                                message.receiver_id === user?.id
                                    ? 'self-start flex-row '
                                    : 'self-end  flex-row-reverse'
                            }`}
                        >
                            <img
                                className="h-full w-full object-contain  rounded-lg"
                                src={message.content}
                            />
                        </div>
                    ) : (
                        <p className={commonClass}>{message.content}</p>
                    )}
                </div>
            </div>

            <div
                className={`flex items-start my-1 ${
                    message.receiver_id === user?.id
                        ? ' self-start flex-row'
                        : ' self-end flex-row-reverse'
                }`}
            >
                {isLastFromMy && isFriendSeeMessage && (
                    <img
                        src={friendAvatar}
                        className={`w-3 h-3  rounded-full object-top object-cover  text-end`}
                    />
                )}
                <p
                    className={`text-nowrap text-xs   ${isOpenDate ? 'block' : 'hidden'}  ${
                        message.receiver_id === user?.id ? 'mx-10  ' : ' mx-3'
                    } `}
                >
                    {showMessageTime}
                </p>
            </div>
        </li>
    )
})

export default Message
