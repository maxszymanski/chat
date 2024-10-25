import { useQuery } from '@tanstack/react-query'
import { getFriendsUsers } from '../services/apiAuth'
import { UserFriend } from '../types/types'
import { useChatContext } from '../context/useChatContext'

export function useFavoriteUsers() {
    const { activeTab } = useChatContext()
    const {
        isLoading: isLoadingFavUsers,
        error,
        data: favUsers = [],
    } = useQuery<UserFriend[]>({
        queryKey: ['users', activeTab],
        queryFn: () => getFriendsUsers(),
        staleTime: 0,
    })

    return { isLoadingFavUsers, error, favUsers }
}
