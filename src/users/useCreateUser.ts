import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addUser } from '../services/apiAuth'

export function useCreateUser() {
    const queryClient = useQueryClient()
    const { mutate: createUser, isPending: isCreating } = useMutation({
        mutationFn: addUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['users'],
            })
        },
        onError: (err) => console.log(err.message),
    })
    return { isCreating, createUser }
}
