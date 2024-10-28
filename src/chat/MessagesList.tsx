import { useMessages } from '../hooks/useMessages'

import { useEffect, useRef } from 'react'
import Message from './Message'
import Spinner from '../components/Spinner'

function MessagesList() {
    const { messages, isLoading } = useMessages()

    const messagesEndRef = useRef<HTMLLIElement | null>(null)

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

    // const lastMessageId = messages[messages.length - 1].id

    return (
        <ul className="flex flex-col gap-4 justify-end min-h-full ">
            {isLoading && <Spinner />}
            {!isLoading &&
                messages.map((message, index) => {
                    return (
                        <Message
                            key={message.id}
                            message={message}
                            index={index}
                        />
                    )
                })}
            <li ref={messagesEndRef} />
        </ul>
    )
}

export default MessagesList
