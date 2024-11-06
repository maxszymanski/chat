import Loader from '../components/Loader'
import { useFriend } from '../hooks/useFriend'
import NoUserFound from '../users/NoUserFound'
import ChatHeader from './ChatHeader'
import ChatMain from './ChatMain'
import ChatMessage from './ChatMessage'

function Chat() {
    const { friend, isLoading } = useFriend()

    return (
        <div className="h-full flex flex-col w-full ">
            {isLoading && (
                <div
                    className="flex-1 overflow-y-auto px-6 py-6 text-lg relative scrollbar-thin
        scrollbar-thumb-sky-300 scrollbar-track-sky-100"
                >
                    <Loader />
                </div>
            )}
            {friend && (
                <>
                    <ChatHeader />
                    <ChatMain />
                    <ChatMessage />
                </>
            )}
            {!friend && !isLoading && <NoUserFound />}
        </div>
    )
}

export default Chat
