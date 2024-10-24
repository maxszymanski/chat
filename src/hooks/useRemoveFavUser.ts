import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeUserFriends } from '../services/apiAuth'

import toast from 'react-hot-toast'

export function useRemoveUserFriends() {
    const queryClient = useQueryClient()
    const { mutate: removeFriends, isPending: isRemovingFriends } = useMutation(
        {
            mutationFn: (friendId: string) => removeUserFriends(friendId),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ['user'],
                })
                await queryClient.refetchQueries({ queryKey: ['user'] })
                await queryClient.invalidateQueries({ queryKey: ['users'] })
                toast.success('Usunięto użytkownika z ulubionych')
            },
            onError: () =>
                toast.error(
                    'Wystąpił bład podczas usuwania użytkownika do ulubionych'
                ),
        }
    )

    return { isRemovingFriends, removeFriends }
}
