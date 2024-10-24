import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyMessages } from '../services/apiChat'
import { useUser } from './useUser'
import { useFriend } from './useFriend'
import supabase from '../services/supabase'
import { useEffect } from 'react'
import { Message } from '../types/types'

export function useMessages(listUser: string | null = null) {
    const ANONYMOUS_USER_ID = '00000000-0000-0000-0000-000000000000'
    const { user } = useUser()
    const { friendId: otherUser } = useFriend()
    const userId = user ? user.id : ANONYMOUS_USER_ID
    const queryClient = useQueryClient()
    const otherUserId = listUser ? listUser : otherUser

    const {
        isLoading,
        error,
        data: messages = [],
    } = useQuery<Message[]>({
        queryKey: ['messages', userId, otherUserId],
        queryFn: () => getMyMessages(userId, otherUserId || ANONYMOUS_USER_ID),
    })

    useEffect(() => {
        const channel = supabase
            .channel('messages-change')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                },
                () => {
                    queryClient.invalidateQueries({
                        queryKey: ['messages', userId, otherUserId],
                    })
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId, otherUserId, queryClient])

    return { isLoading, error, messages }
}
