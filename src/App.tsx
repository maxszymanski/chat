import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Chat from './chat/Chat'
import Login from './pages/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Homepage from './pages/Homepage'
import ProtectedRoute from './components/ProtectedRouth'
import SignUp from './pages/SignUp'
import ChatNavigation from './chat/ChatNavigation'
import { ChatProvider } from './context/ChatContext'
import Account from './users/Account'
import UserProfile from './users/UserProfile'
import { Toaster } from 'react-hot-toast'
import PublicProfile from './users/PublicProfile'
import FullPageImage from './users/FullPageImage'
import Welcome from './pages/Welcome'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage />,
        children: [
            {
                path: '',
                element: <Welcome />,
            },
            { path: '/login', element: <Login /> },
            {
                path: '/signup',
                element: <SignUp />,
            },
        ],
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
        ],
    },
    {
        path: '/account',
        element: (
            <ProtectedRoute>
                <Account />
            </ProtectedRoute>
        ),
        children: [
            { path: '', element: <UserProfile /> },
            { path: '/account/:userId', element: <PublicProfile /> },
            { path: '/account/picture/:userId', element: <FullPageImage /> },
        ],
    },
])

const queryClient = new QueryClient()

function App() {
    return (
        <ChatProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
                <Toaster
                    position={'top-right'}
                    gutter={12}
                    containerStyle={{
                        marginTop: '14px',
                        marginRight: '12px',
                    }}
                    toastOptions={{
                        success: {
                            duration: 2000,
                        },
                        error: {
                            duration: 2000,
                            style: {
                                color: '#ef4444',
                            },
                        },
                        style: {
                            fontSize: '18px',
                            padding: '16px 20px',
                            backgroundColor: '#f1f5f9',
                            color: '#1e40af',
                            border: '1px solid #f3f4f6',
                            WebkitBoxShadow: '0px 2px 12px 0px #bae6fd',
                            MozBoxShadow: '0px 2px 12px 0px #bae6fd',
                            boxShadow: '0px 2px 12px 0px #bae6fd',
                            fontFamily: 'Nunito Sans Variable',
                            textAlign: 'center',
                        },
                    }}
                />
            </QueryClientProvider>
        </ChatProvider>
    )
}

export default App
