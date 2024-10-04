import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getMyMessages } from '../services/apiChat'
import { useUser } from '../users/useUser'
import { useFriend } from './useFriend'
import supabase from '../services/supabase'
import { useEffect } from 'react'

export function useMessages() {
    const ANONYMOUS_USER_ID = '00000000-0000-0000-0000-000000000000'
    const { user } = useUser()
    const { userId: otherUser } = useFriend()
    const userId = user ? user.id : ANONYMOUS_USER_ID
    const queryClient = useQueryClient()
    const otherUserId = otherUser ? otherUser : ANONYMOUS_USER_ID

    const {
        isLoading,
        error,
        data: messages = [],
    } = useQuery({
        queryKey: ['messages', userId, otherUserId],
        queryFn: () => getMyMessages(userId, otherUserId || ''),
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
