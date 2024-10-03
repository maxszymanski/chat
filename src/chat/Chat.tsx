import { useUser } from '../users/useUser'
import ChatHeader from './ChatHeader'
import ChatMain from './ChatMain'
import ChatMessage from './ChatMessage'

import Loader from '../components/Loader'
import { checkAndAddUser } from '../services/apiAuth'

function Chat() {
    const { isLoading, user } = useUser()

    if (user) {
        checkAndAddUser(user?.id, user.email || '', user.user_metadata.username)
    }
    if (isLoading) return <Loader />

    return (
        <div className="h-screen flex flex-col flex-1">
            <ChatHeader />
            <ChatMain />
            <ChatMessage />
        </div>
    )
}

export default Chat
