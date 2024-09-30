import { Outlet } from 'react-router-dom'

function AppLayout() {
    return (
        <div className="bg-gray-100 font-nunito overflow-hidden">
            <Outlet />
        </div>
    )
}

export default AppLayout
