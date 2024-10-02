import { useQuery } from '@tanstack/react-query'
import { getUserFriend } from '../services/apiAuth'
import { useParams } from 'react-router-dom'

export function useFriend() {
    const { userId } = useParams()
    const {
        isLoading,
        error,
        data: friend,
    } = useQuery({
        queryKey: ['users', userId],
        queryFn: () => getUserFriend(userId || ''),
    })
    return { isLoading, error, friend, userId }
}
