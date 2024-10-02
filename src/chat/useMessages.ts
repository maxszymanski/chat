import { useQuery } from '@tanstack/react-query'
import { getMyMessages } from '../services/apiChat'
import { useUser } from '../users/useUser'
import { useFriend } from './useFriend'

export function useMessages() {
    const ANONYMOUS_USER_ID = '00000000-0000-0000-0000-000000000000'
    const { user } = useUser()
    const { userId: otherUserId } = useFriend()
    const userId = user ? user.id : ANONYMOUS_USER_ID

    const {
        isLoading,
        error,
        data: messages = [],
    } = useQuery({
        queryKey: ['messages', userId, otherUserId],
        queryFn: () => getMyMessages(userId, otherUserId || ''),
    })
    return { isLoading, error, messages }
}
