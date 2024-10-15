import { useUser } from '../hooks/useUser'
import ChatHeader from './ChatHeader'
import ChatMain from './ChatMain'
import ChatMessage from './ChatMessage'

import Loader from '../components/Loader'

function Chat() {
    const { isLoading } = useUser()

    if (isLoading) return <Loader />

    return (
        <div className="h-full flex flex-col w-full ">
            <ChatHeader />
            <ChatMain />
            <ChatMessage />
        </div>
    )
}

export default Chat
