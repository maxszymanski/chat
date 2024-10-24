import ChatHeader from './ChatHeader'
import ChatMain from './ChatMain'
import ChatMessage from './ChatMessage'

function Chat() {
    return (
        <div className="h-full flex flex-col w-full ">
            <ChatHeader />
            <ChatMain />
            <ChatMessage />
        </div>
    )
}

export default Chat
