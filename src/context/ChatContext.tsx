import { createContext, useState } from 'react'
import { ChatContextType } from '../types/types'

const ChatContext = createContext<ChatContextType | undefined>(undefined)

function ChatProvider({ children }: { children: React.ReactNode }) {
    const [isLogoutModelOpen, setIsLogoutModalOpen] = useState(false)
    // const [isLogoutModelOpen, setIsLogoutModalOpen] = useState({isOpen:false,
    //     modal: 'logout'
    // })

    const handleToogleLogoutModal = () => {
        setIsLogoutModalOpen((is) => !is)
    }

    // const handleToogleLogoutModal = () => {
    //     setIsLogoutModalOpen((is) => !is)
    // }

    return (
        <ChatContext.Provider
            value={{ isLogoutModelOpen, handleToogleLogoutModal }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContext, ChatProvider }
