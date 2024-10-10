import NoChatSelected from '../components/NoChatSelected'
import { checkAndAddUser } from '../services/apiAuth'
import { useUser } from '../users/useUser'
import Friends from './Friends'
import Header from './Header'

function ChatNavigation() {
    const { user } = useUser()

    if (user) {
        checkAndAddUser(
            user?.id,
            user.email || '',
            user.user_metadata.username || 'User',
            user?.user_metadata.status || 'Nowy na czacie – poznaj mnie!',
            user?.user_metadata.aboutme ||
                'Hej! Jeszcze się tutaj urządzam, ale zapraszam do kontaktu!',
            user.user_metadata.avatar
        )
    }

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
