import { FieldError } from 'react-hook-form'

export interface User {
    email: string
    password: string
    passwordConfirm: string
    username: string
}

export interface UserLogin {
    email: string
    password: string
}
export interface MessageType {
    sender_id: string
    receiver_id: string
    content: string
}

export interface MessageToUpdate {
    id: string
    read_status: boolean
}
export interface MessageAlertToUpdate {
    id: string
    alert: boolean
}

export interface ChatContextType {
    modalState: { isOpen: boolean; modalType: string | null }
    openModal: (modalType: string) => void
    closeModal: () => void
    activeTab: string
    handleActiveFav: () => void
    handleActiveAll: () => void
}
export interface UserFriend {
    id: string
    username: string
    email: string
    avatar: string | null
    status: string
    aboutme: string
}
export interface Message {
    content: string
    created_at: string
    id: string
    receiver_id: string
    sender_id: string
    read_status: boolean
    alert: boolean
}
export interface Pass {
    password: string
    passwordConfirm: string
}

export interface FormInputTypes {
    error: FieldError | null
    placeholder: string
    type: string
    id: string
    formRegister: object
    errorMessage: string | null
    isPending: boolean
}
