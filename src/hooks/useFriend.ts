import { useQuery } from '@tanstack/react-query'
import { getUserFriend } from '../services/apiAuth'
import { useParams } from 'react-router-dom'
import { UserFriend } from '../types/types'

export function useFriend(id: string | null = null) {
    const { userId } = useParams()

    const friendId = id ? id : userId
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
