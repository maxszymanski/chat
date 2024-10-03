import { useUser } from '../users/useUser'
import { useMessages } from './useMessages'
import Loader from '../components/Loader'
import { useEffect, useRef } from 'react'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'

function ChatMain() {
    const { isLoading, messages } = useMessages()
    const { user, isLoading: isUserLoading } = useUser()
    const messagesEndRef = useRef<HTMLLIElement | null>(null)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
        }
    }

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom() // Przewinięcie natychmiast, bez animacji
        }
    }, [messages])

    if (isLoading || isUserLoading) return <Loader />

    return (
        <main className="flex-1 overflow-y-auto px-6 py-6 text-lg">
            <ul className="flex flex-col gap-4 justify-end min-h-full">
                {messages.map((message, index) => {
                    const isLastFromUser =
                        index === messages.length - 1 || // Jeśli jest ostatnią wiadomością
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
                                src="/default-user.webp"
                                className={`w-9 h-9  rounded-full object-cover mb-1 bg-stone-50 border border-stone-50 p-0.5 ${isLastFromUser ? 'opacity-100' : 'opacity-0'} `}
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
                                <p className={commonClass}>{message.content}</p>
                            )}
                        </li>
                    )
                })}
                <li ref={messagesEndRef} />
            </ul>
        </main>
    )
}

export default ChatMain
