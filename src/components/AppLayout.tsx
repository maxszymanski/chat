import { Outlet } from 'react-router-dom'
import Header from '../chat/Header'
import Friends from '../chat/Friends'
import Modal from './Modal'
import { useChatContext } from '../context/useChatContext'

function AppLayout() {
    const { isLogoutModelOpen } = useChatContext()
    return (
        <>
            <div className="bg-gray-100 font-nunito overflow-hidden h-screen md:hidden">
                <Outlet />
            </div>
            <div className="bg-gray-100 font-nunito  h-screen hidden md:flex ">
                <div className="flex flex-col h-full w-full max-w-[1500px] mx-auto 2xl:border-l 2xl:border-r 2xl:border-stone-200">
                    <Header />
                    <div className="flex flex-1 overflow-hidden">
                        <Friends />

                        <Outlet />
                    </div>
                </div>
            </div>
            {isLogoutModelOpen && <Modal />}
        </>
    )
}

export default AppLayout
