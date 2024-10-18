import { useContext } from 'react'
import { ChatContext } from './ChatContext'

function useChatContext() {
    const contexts = useContext(ChatContext)
    if (contexts === undefined)
        throw new Error('Chat context został użyty poza providerem')
    return contexts
}
export { useChatContext }
