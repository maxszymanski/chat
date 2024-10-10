export interface User {
    email: string
    password: string
    passwordConfirm: string
    username: string
}

export interface MessageType {
    sender_id: string
    receiver_id: string
    content: string
}

export interface ChatContextType {
    modalState: { isOpen: boolean; modalType: string | null }
    openModal: (modalType: string) => void
    closeModal: () => void
}
