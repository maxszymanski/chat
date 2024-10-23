import { Outlet } from 'react-router-dom'
import { useChatContext } from '../context/useChatContext'
import { useUser } from '../hooks/useUser'
import { checkAndAddUser } from '../services/apiAuth'

function Account() {
    const { modalState } = useChatContext()
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
        <div
            className={`bg-gray-100 font-nunito  h-screen flex flex-col ${modalState.isOpen ? 'overflow-hidden h-screen' : 'overflow-auto'} `}
        >
            <Outlet />
        </div>
    )
}

export default Account
