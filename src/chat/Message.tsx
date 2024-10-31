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
import { useState } from 'react'

function Message({ message, index }: { message: MessageType; index: number }) {
    const [isOpenDate, setIsOpenDate] = useState(false)
    const { messages } = useMessages()
    const { user } = useUser()
    const { friend } = useFriend()

    const friendAvatar = friend?.avatar || '/default-user.webp'

    const isLastFromUser =
        index === messages.length - 1 ||
        messages[index + 1].sender_id !== message.sender_id

    const commonClass = ` p-3 max-w-60  rounded-2xl  text-start  w-fit ${
        message.receiver_id === user?.id ? 'bg-white ' : 'bg-sky-300 '
    }`

    const messageCreated = message?.created_at
    const previousMessageCreated =
        index > 0 ? messages[index - 1]?.created_at : null

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

    const isSvg = message.content.startsWith('<svg')
    const isLink =
        message.content.startsWith('http') &&
        !message.content.includes('supabase.co/storage')
    const isFile =
        message.content.startsWith('http') &&
        message.content.includes('supabase.co/storage')

    return (
        <li key={message.id}>
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
                        <img
                            className="h-10 w-10 rounded-sm"
                            src={message.content}
                        />
                    ) : (
                        <p className={commonClass}>{message.content}</p>
                    )}
                </div>
            </div>
            <p
                className={`text-nowrap text-xs mt-2  ${isOpenDate ? 'block' : 'hidden'}  ${
                    message.receiver_id === user?.id
                        ? 'mx-12 '
                        : 'text-end mx-4'
                } `}
            >
                {showMessageTime}
            </p>
        </li>
    )
}

export default Message
