import { Link } from 'react-router-dom'
import { useMessages } from '../hooks/useMessages'
import { useUser } from '../hooks/useUser'
import parse from 'html-react-parser'
import Loader from '../components/Loader'
import { Message as MessageType } from '../types/types'
import { useFriend } from '../hooks/useFriend'

function Message({ message, index }: { message: MessageType; index: number }) {
    const { messages, isLoading } = useMessages()
    const { user, isLoading: isUserLoading } = useUser()
    const { friend } = useFriend()

    const userAvatar = user?.user_metadata.avatar || '/default-user.webp'
    const friendAvatar = friend?.avatar || '/default-user.webp'

    const isLastFromUser =
        index === messages.length - 1 ||
        messages[index + 1].sender_id !== message.sender_id

    const commonClass = ` p-3 max-w-60  rounded-2xl   w-fit ${
        message.receiver_id === user?.id ? 'bg-white ' : 'bg-blue-300 '
    }`

    const isSvg = message.content.startsWith('<svg')
    const isLink = message.content.startsWith('http')

    if (isLoading || isUserLoading) return <Loader />

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
                    message.receiver_id === user?.id ? friendAvatar : userAvatar
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
                    className={`${commonClass} underline`}
                >
                    {message.content}
                </Link>
            ) : (
                <p className={commonClass}>{message.content}</p>
            )}
        </li>
    )
}

export default Message
