import EmptyChat from '../components/EmptyChat'
import Loader from '../components/Loader'
import { useFriend } from '../hooks/useFriend'

import { useMessages } from '../hooks/useMessages'
import MessagesList from './MessagesList'

function ChatMain() {
    const { messages, isLoadingMessages } = useMessages()
    const { friend, isLoading } = useFriend()

    return (
        <main
            className="flex-1 overflow-y-auto px-6 py-6 text-lg relative scrollbar-thin
        scrollbar-thumb-sky-300 scrollbar-track-sky-100"
        >
            {(isLoadingMessages || isLoading) && <Loader />}
            {messages.length > 0 && friend && <MessagesList />}
            {messages.length === 0 && friend && <EmptyChat />}
        </main>
    )
}

export default ChatMain
