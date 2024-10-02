import { useUser } from '../users/useUser'
import { useMessages } from './useMessages'
import Loader from '../components/Loader'

function ChatMain() {
    const { isLoading, messages } = useMessages()
    const { user, isLoading: isUserLoading } = useUser()

    if (isLoading || isUserLoading) return <Loader />

    return (
        <main className="flex-grow  overflow-y-auto px-6  text-lg py-6 ">
            <ul className="flex flex-col justify-end gap-4 h-full">
                {messages.map((message) => (
                    <p
                        key={message.id}
                        className={` p-3 max-w-60  rounded-2xl  w-fit ${
                            message.sender_id === user?.id
                                ? 'bg-white self-start'
                                : 'bg-blue-300 self-end'
                        }`}
                    >
                        {message.content}
                    </p>
                ))}
            </ul>
        </main>
    )
}

export default ChatMain
