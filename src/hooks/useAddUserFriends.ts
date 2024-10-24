import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addUserFriends } from '../services/apiAuth'

import toast from 'react-hot-toast'

export function useAddUserFriends() {
    const queryClient = useQueryClient()
    const { mutate: addFriends, isPending: isAddingFriends } = useMutation({
        mutationFn: (newFriend: string) => addUserFriends(newFriend),
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
    })

    return { isAddingFriends, addFriends }
}
