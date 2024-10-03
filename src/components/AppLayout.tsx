import { Outlet } from 'react-router-dom'
import Friends from '../chat/Friends'

function AppLayout() {
    return (
        <div className="bg-gray-100 font-nunito overflow-hidden flex ">
            <Friends />
            <Outlet />
        </div>
    )
}

export default AppLayout
