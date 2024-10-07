import { Outlet } from 'react-router-dom'

function Account() {
    return (
        <div className="bg-gray-100 font-nunito overflow-hidden h-screen ">
            <Outlet />
        </div>
    )
}

export default Account
