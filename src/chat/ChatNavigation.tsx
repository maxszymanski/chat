import NoChatSelected from '../components/NoChatSelected'
import Friends from './Friends'
import Header from './Header'

function ChatNavigation() {
    return (
        <>
            <div className="sm:hidden h-full w-full">
                <Header />
                <div className=" h-full overflow-y-auto pb-20 w-full">
                    <Friends />
                </div>
            </div>
            <NoChatSelected />
        </>
    )
}

export default ChatNavigation
