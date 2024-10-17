import { Outlet } from 'react-router-dom'
import Header from '../chat/Header'
import Friends from '../chat/Friends'
import { useChatContext } from '../context/useChatContext'
import { useUser } from '../hooks/useUser'
import { checkAndAddUser } from '../services/apiAuth'

function AppLayout() {
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
            className={`${modalState.isOpen ? 'overflow-hidden' : 'overflow-auto'}`}
        >
            <div className="bg-gray-100 font-nunito overflow-hidden h-screen md:hidden z-20">
                <Outlet />
            </div>
            <div className="bg-gray-100 font-nunito  h-screen hidden md:flex ">
                <div className="flex flex-col h-full w-full  ">
                    <Header />
                    <div className="flex flex-1 overflow-hidden">
                        <Friends />

                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppLayout
