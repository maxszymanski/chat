import { useUser } from '../hooks/useUser'
import ChatHeader from './ChatHeader'
import ChatMain from './ChatMain'
import ChatMessage from './ChatMessage'

function Chat() {
    const { isLoading } = useUser()

    return (
        <div className="h-full flex flex-col w-full ">
            {isLoading && <p>Loading...</p>}
            <ChatHeader />
            <ChatMain />
            <ChatMessage />
        </div>
    )
}

export default Chat
