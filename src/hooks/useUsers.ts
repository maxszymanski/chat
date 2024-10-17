import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/apiAuth'
import { UserFriend } from '../types/types'

export function useUsers() {
    const {
        isLoading,
        error,
        data: users = [],
    } = useQuery<UserFriend[]>({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    })
    return { isLoading, error, users }
}
