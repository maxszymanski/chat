import NoChatSelected from '../components/NoChatSelected'
import Friends from './Friends'
import Header from './Header'

function ChatNavigation() {
    return (
        <>
            <div className="md:hidden h-full">
                <Header />
                <div className=" h-full overflow-auto pb-20">
                    <Friends />
                </div>
            </div>
            <NoChatSelected />
        </>
    )
}

export default ChatNavigation
