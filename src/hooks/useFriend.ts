import { useQuery } from '@tanstack/react-query'
import { getUserFriend } from '../services/apiAuth'
import { useParams } from 'react-router-dom'
import { UserFriend } from '../types/types'

export function useFriend(id: string | null = null) {
    const { userId } = useParams()
    const ANONYMOUS_USER_ID = '00000000-0000-0000-0000-000000000000'

    const friendId = id || userId || ANONYMOUS_USER_ID
    const {
        isLoading,
        error,
        data: friend,
    } = useQuery<UserFriend>({
        queryKey: ['users', friendId],
        queryFn: () => getUserFriend(friendId || ''),
    })
    return { isLoading, error, friend, friendId }
}
