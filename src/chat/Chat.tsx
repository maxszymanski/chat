import ChatHeader from './ChatHeader'
import ChatMain from './ChatMain'
import ChatMessage from './ChatMessage'

function Chat() {
	return (
		<div className="h-screen flex flex-col">
			<ChatHeader />
			<ChatMain />
			<ChatMessage />
		</div>
	)
}

export default Chat
