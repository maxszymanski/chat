import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout'
import Chat from './chat/Chat'
import Login from './pages/Login'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
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
import AllFriends from './chat/AllFriends'
import FavoriteFriends from './chat/FavoriteFriends'

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
                // children: [
                //     { path: '', element: <AllFriends /> },
                //     { path: '/chat/favorite', element: <FavoriteFriends /> },
                // ],
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
