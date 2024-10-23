import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUserFriends } from '../services/apiAuth'

import toast from 'react-hot-toast'

export function useUpdateUserFriends() {
    const queryClient = useQueryClient()
    const { mutate: updateFriends, isPending: isUpdatingFriends } = useMutation(
        {
            mutationFn: (newFriend: string) => updateUserFriends(newFriend),
            onSuccess: async () => {
                await queryClient.invalidateQueries({
                    queryKey: ['user'],
                })
                await queryClient.refetchQueries({ queryKey: ['user'] })

                toast.success('Dodano nowego użytkownika do ulubionych')
            },
            onError: () =>
                toast.error(
                    'Wystąpił bład podczas dodawania użytkownika do ulubionych'
                ),
        }
    )

    return { isUpdatingFriends, updateFriends }
}
