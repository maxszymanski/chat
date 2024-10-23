import { useQuery } from '@tanstack/react-query'
import { getFriendsUsers } from '../services/apiAuth'
import { UserFriend } from '../types/types'

export function useFavoriteUsers() {
    const {
        isLoading: isLoadingFavUsers,
        error,
        data: favUsers = [],
    } = useQuery<UserFriend[]>({
        queryKey: ['users'],
        queryFn: () => getFriendsUsers(),
    })
    return { isLoadingFavUsers, error, favUsers }
}
