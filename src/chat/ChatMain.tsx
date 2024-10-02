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
                    <div
                        key={message.id}
                        className={`flex gap-2 items-end ${
                            message.sender_id === user?.id
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
                                message.sender_id === user?.id
                                    ? 'bg-white '
                                    : 'bg-blue-300 '
                            }`}
                        >
                            {message.content}
                        </p>
                    </div>
                ))}
            </ul>
        </main>
    )
}

export default ChatMain
