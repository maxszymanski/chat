import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { getMyMessages } from '../services/apiChat'
import { useUser } from './useUser'
import { useFriend } from './useFriend'
import supabase from '../services/supabase'
import { useEffect } from 'react'

export function useMessages(listUser: string | null = null) {
    const ANONYMOUS_USER_ID = '00000000-0000-0000-0000-000000000000'
    const { user } = useUser()
    const { friendId: otherUser } = useFriend(listUser)
    const userId = user ? user.id : ANONYMOUS_USER_ID
    const queryClient = useQueryClient()
    const otherUserId = listUser || otherUser || ANONYMOUS_USER_ID
    const limit = 20

    // const {
    //     isLoading: isLoadingMessages,
    //     error,
    //     data: messages = [],
    //     fetchNextPage,
    // } = useQuery<Message[]>({
    //     queryKey: ['messages', userId, otherUserId],
    //     queryFn: () => getMyMessages(userId, otherUserId || ANONYMOUS_USER_ID),
    // })

    const {
        data: paginatedMessages,
        isLoading: isLoadingMessages,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        error,
    } = useInfiniteQuery({
        queryKey: ['messages', userId, otherUserId],
        queryFn: ({ pageParam = 0 }) =>
            getMyMessages(userId, otherUserId, limit, pageParam),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.length < limit ? undefined : allPages.length * limit,
        select: (data) => ({
            ...data,
            pages: data.pages.flatMap((page) => page).reverse(),
        }),
    })

    const messages = paginatedMessages?.pages || []

    useEffect(() => {
        const channel = supabase.channel('messages-change')

        channel.on(
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
                queryClient.refetchQueries({
                    queryKey: ['messages'],
                })
                queryClient.refetchQueries({
                    queryKey: ['users'],
                })
            }
        )

        channel.on(
            'postgres_changes',
            {
                event: 'UPDATE',
                schema: 'public',
                table: 'messages',
            },
            (payload) => {
                if (
                    payload.new.receiver_id === userId ||
                    payload.new.sender_id === userId
                ) {
                    queryClient.invalidateQueries({
                        queryKey: ['messages', userId, otherUserId],
                    })
                    queryClient.refetchQueries({
                        queryKey: ['messages'],
                    })
                    queryClient.refetchQueries({
                        queryKey: ['users'],
                    })
                }
            }
        )
        channel.subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [userId, otherUserId, queryClient])

    return {
        isLoadingMessages,
        error,
        messages,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    }
}
