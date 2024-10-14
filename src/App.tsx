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
import { Toaster } from 'react-hot-toast'
import PublicProfile from './users/PublicProfile'

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
                    position={'bottom-center'}
                    gutter={12}
                    containerStyle={{
                        marginBottom: '10px',
                    }}
                    toastOptions={{
                        success: {
                            duration: 2000,
                        },
                        error: {
                            duration: 2000,
                            style: {
                                backgroundColor: '#ef4444',
                            },
                        },
                        style: {
                            fontSize: '18px',
                            padding: '16px 20px',
                            backgroundColor: '#8fcc33',
                            color: '#fff',
                            fontFamily: 'Nunito Sans Variable',
                            textAlign: 'center',
                        },
                    }}
                />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryClientProvider>
        </ChatProvider>
    )
}

export default App
