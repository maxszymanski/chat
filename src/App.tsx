import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Chat from './chat/Chat'

const router = createBrowserRouter([{ element: <AppLayout />, children: [{ path: '/', element: <Chat /> }] }])

function App() {
	return <RouterProvider router={router} />
}

export default App
