import { useUser } from '../users/useUser'
import { useMessages } from './useMessages'
import Loader from '../components/Loader'
import { useEffect, useRef } from 'react'

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
                {messages.map((message) => (
                    <li
                        key={message.id}
                        className={`flex gap-2 items-end ${
                            message.receiver_id === user?.id
                                ? 'self-start flex-row '
                                : 'self-end  flex-row-reverse'
                        }`}
                    >
                        <img
                            src="/default-user.webp"
                            className="w-7 h-7 md:w-11 md:h-11 rounded-full object-cover"
                        />
                        <p
                            className={` p-3 max-w-60  rounded-2xl  w-fit ${
                                message.receiver_id === user?.id
                                    ? 'bg-white '
                                    : 'bg-blue-300 '
                            }`}
                        >
                            {message.content}
                        </p>
                    </li>
                ))}
                <li ref={messagesEndRef} />
            </ul>
        </main>
    )
}

export default ChatMain
