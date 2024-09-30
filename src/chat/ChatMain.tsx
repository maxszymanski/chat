import { useEffect, useState } from 'react'
import { getMyMessages } from '../services/apiChat'
import { useUser } from '../users/useUser'

function ChatMain() {
    const [messages, setMessages] = useState([])
    const { user } = useUser()

    useEffect(() => {
        const fetchMessages = async () => {
            const fetchedMessages = await getMyMessages()
            setMessages(fetchedMessages) //
        }

        fetchMessages()
    }, [])

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
