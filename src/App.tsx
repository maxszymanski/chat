import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Chat from './chat/Chat'
import Login from './users/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Homepage from './Homepage'
import ProtectedRoute from './components/ProtectedRouth'
import SignUp from './users/SignUp'

import FriendsDesktop from './chat/FriendsDesktop'

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
                element: <FriendsDesktop />,
            },
            {
                path: '/chat/:userId',
                element: <Chat />,
            },
        ],
    },
])

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    )
}

export default App
