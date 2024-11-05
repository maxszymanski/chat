import { createContext, useState } from 'react'
import { ChatContextType } from '../types/types'

const ChatContext = createContext<ChatContextType | undefined>(undefined)

function ChatProvider({ children }: { children: React.ReactNode }) {
    const [modalState, setModalState] = useState<{
        isOpen: boolean
        modalType: string | null
    }>({
        isOpen: false,
        modalType: null,
    })
    const [activeTab, setActiveTab] = useState('all')

    const openModal = (modalType: string | null) => {
        setModalState({
            isOpen: true,
            modalType,
        })
    }
    const closeModal = () => {
        setModalState({
            isOpen: false,
            modalType: null,
        })
    }

    const handleActiveAll = () => {
        setActiveTab('all')
    }
    const handleActiveFav = () => {
        setActiveTab('fav')
    }

    return (
        <ChatContext.Provider
            value={{
                modalState,
                openModal,
                closeModal,
                activeTab,
                handleActiveAll,
                handleActiveFav,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContext, ChatProvider }
