import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/apiAuth'

export function useUsers() {
    const {
        isLoading,
        error,
        data: users,
    } = useQuery({
        queryKey: ['users'],
        queryFn: () => getAllUsers(),
    })
    return { isLoading, error, users }
}
