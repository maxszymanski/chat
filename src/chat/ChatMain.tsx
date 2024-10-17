import { useUser } from '../hooks/useUser'
import { useMessages } from '../hooks/useMessages'
import Loader from '../components/Loader'
import { useEffect, useRef } from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { useFriend } from '../hooks/useFriend'
import FriendInfo from '../users/FriendInfo'

function ChatMain() {
    const { isLoading, messages } = useMessages()
    const { user, isLoading: isUserLoading } = useUser()
    const { friend } = useFriend()
    const messagesEndRef = useRef<HTMLLIElement | null>(null)
    const userAvatar = user?.user_metadata.avatar || '/default-user.webp'
    const friendAvatar = friend?.avatar || '/default-user.webp'

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
        }
    }

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom()
        }
    }, [messages])

    if (isLoading || isUserLoading) return <Loader />

    return (
        <main className="flex-1 overflow-y-auto px-6 py-6 text-lg">
            {messages.length > 0 && (
                <ul className="flex flex-col gap-4 justify-end min-h-full ">
                    {messages.map((message, index) => {
                        const isLastFromUser =
                            index === messages.length - 1 ||
                            messages[index + 1].sender_id !== message.sender_id

                        const commonClass = ` p-3 max-w-60  rounded-2xl   w-fit ${
                            message.receiver_id === user?.id
                                ? 'bg-white '
                                : 'bg-blue-300 '
                        }`

                        const isSvg = message.content.startsWith('<svg')
                        const isLink = message.content.startsWith('http')

                        return (
                            <li
                                key={message.id}
                                className={`flex gap-2 items-end break-words  ${
                                    message.receiver_id === user?.id
                                        ? 'self-start flex-row '
                                        : 'self-end  flex-row-reverse'
                                }`}
                            >
                                <img
                                    src={
                                        message.receiver_id === user?.id
                                            ? friendAvatar
                                            : userAvatar
                                    }
                                    className={`w-7 h-7  rounded-full object-top object-cover   ${isLastFromUser ? 'opacity-100' : 'opacity-0'} `}
                                />
                                {isSvg ? (
                                    parse(`${message.content}`)
                                ) : isLink ? (
                                    <Link
                                        target="_blank"
                                        rel="noopener"
                                        to={message.content}
                                        className={commonClass}
                                    >
                                        {message.content}
                                    </Link>
                                ) : (
                                    <p className={commonClass}>
                                        {message.content}
                                    </p>
                                )}
                            </li>
                        )
                    })}
                    <li ref={messagesEndRef} />
                </ul>
            )}
            {messages.length <= 0 && (
                <div className="flex h-full justify-center items-center">
                    <FriendInfo inProfile={false} />
                </div>
            )}
        </main>
    )
}

export default ChatMain
