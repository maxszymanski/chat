import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Chat from './chat/Chat'
import Login from './users/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Homepage from './Homepage'
import ProtectedRoute from './components/ProtectedRouth'
import SignUp from './users/SignUp'
import ChatNavigation from './chat/ChatNavigation'
import { ChatProvider } from './context/ChatContext'
import Account from './users/Account'
import UserProfile from './users/UserProfile'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },

    {
        path: '/chat',
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '',
                element: <ChatNavigation />,
            },
            {
                path: '/chat/:userId',
                element: <Chat />,
            },
            { path: 'chat/account', element: <Account /> },
        ],
    },
    {
        path: '/account',
        element: (
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
        ),
        children: [{ path: '', element: <UserProfile /> }],
    },
])

const queryClient = new QueryClient()

function App() {
    return (
        <ChatProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </ChatProvider>
    )
}

export default App
