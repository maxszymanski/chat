import { Outlet } from 'react-router-dom'

function Account() {
    return (
        <div className="bg-gray-100 font-nunito  min-h-screen ">
            <Outlet />
        </div>
    )
}

export default Account
