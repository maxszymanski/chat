import { useNavigate } from 'react-router-dom'
import { useUser } from '../users/useUser'
import ChatHeader from './ChatHeader'
import ChatMain from './ChatMain'
import ChatMessage from './ChatMessage'
import { useEffect } from 'react'

function Chat() {
    const { isAuthenticated, user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) return
        if (!isAuthenticated) navigate('/', { replace: true })
    }, [isAuthenticated, navigate])

    return (
        <div className="h-dvh flex flex-col overflow-hidden">
            <ChatHeader />
            <ChatMain />
            <ChatMessage />
        </div>
    )
}

export default Chat
