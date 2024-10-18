import NoChatSelected from '../components/NoChatSelected'
import Friends from './Friends'
import Header from './Header'

function ChatNavigation() {
 

    return (
        <>
            <div className="md:hidden">
                <Header />
                <Friends />
            </div>
            <NoChatSelected />
        </>
    )
}

export default ChatNavigation
