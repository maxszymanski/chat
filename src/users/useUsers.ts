import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/apiAuth'
import { useUser } from './useUser'

export function useUsers() {
    const { user } = useUser()
    const ANONYMOUS_USER_ID = '00000000-0000-0000-0000-000000000000'
    const userId = user ? user.id : ANONYMOUS_USER_ID
    const {
        isLoading,
        error,
        data: users,
    } = useQuery({
        queryKey: ['users', userId],
        queryFn: () => getAllUsers(userId),
    })
    return { isLoading, error, users }
}
