import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../services/apiAuth'
import { UserFriend } from '../types/types'
import { useChatContext } from '../context/useChatContext'

export function useUsers() {
    const { activeTab } = useChatContext()
    const {
        isLoading,
        error,
        data: users = [],
    } = useQuery<UserFriend[]>({
        queryKey: ['users', activeTab],
        queryFn: () => getAllUsers(),
        staleTime: 0,
    })
    return { isLoading, error, users }
}
