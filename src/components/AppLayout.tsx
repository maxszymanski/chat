import { Outlet } from 'react-router-dom'

function AppLayout() {
	return (
		<div className="bg-gray-100 font-nunito">
			<Outlet />
		</div>
	)
}

export default AppLayout
