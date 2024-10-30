import { useMessages } from '../hooks/useMessages'

import { useEffect, useRef } from 'react'
import Message from './Message'
import Spinner from '../components/Spinner'
import { useUpdateMessageStatus } from '../hooks/useUpdateMessageStatus'
import { useUser } from '../hooks/useUser'

function MessagesList() {
    const { messages, isLoading } = useMessages()
    const { updateMessageStatus } = useUpdateMessageStatus()
    const { user } = useUser()

    const messagesEndRef = useRef<HTMLLIElement | null>(null)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' })
        }
    }

    useEffect(() => {
        if (messages.length > 0) {
            scrollToBottom()
            const lastMessageId = messages[messages.length - 1]?.id
            const fromFriendMessage =
                messages[messages.length - 1]?.sender_id != user?.id
            const isMessageNotSeen =
                messages[messages.length - 1]?.read_status === false &&
                fromFriendMessage

            const messageToUpdate = { id: lastMessageId, read_status: true }
            if (isMessageNotSeen) {
                updateMessageStatus(messageToUpdate)
            }
        }
    }, [messages, updateMessageStatus, user])

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
