import { MessageType } from '../types/types'
import supabase from './supabase'

export async function getMyMessages(id: string, otherUserId: string) {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(
            `and(sender_id.eq.${id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${id})`
        )
        .order('created_at', { ascending: true })

    if (error) {
        console.error('Error fetching messages:', error)
        return []
    }

    return data
}

export async function createMessage(newMessage: MessageType) {
    const { data, error } = await supabase
        .from('messages')
        .insert([newMessage])
        .select('*')

    if (error) {
        console.error(error)
        throw new Error('Wystąpił problem podczas wysyłania wiadomości')
    }

    return data
}

export async function updateReadStatus({ id = '', read_status = false }) {
    const { error } = await supabase
        .from('messages')
        .update({ read_status })
        .eq('id', id)
        .select()
    if (error) throw new Error(error.message)
}

// 0ad88916-59fd-4582-822f-241f78193a3c
