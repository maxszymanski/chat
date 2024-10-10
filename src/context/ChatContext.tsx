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

    return (
        <ChatContext.Provider value={{ modalState, openModal, closeModal }}>
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContext, ChatProvider }