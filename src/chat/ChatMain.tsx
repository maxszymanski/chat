import EmptyChat from '../components/EmptyChat'

import Spinner from '../components/Spinner'

import { useMessages } from '../hooks/useMessages'
import MessagesList from './MessagesList'

function ChatMain() {
    const { messages, isLoading } = useMessages()

    return (
        <main className="flex-1 overflow-y-auto px-6 py-6 text-lg">
            {isLoading && <Spinner />}
            {messages.length > 0 ? <MessagesList /> : <EmptyChat />}
        </main>
    )
}

export default ChatMain
