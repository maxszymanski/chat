import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateReadStatus } from '../services/apiChat'
import { MessageToUpdate } from '../types/types'

export function useUpdateMessageStatus() {
    const queryClient = useQueryClient()
    const { mutate: updateMessageStatus } = useMutation({
        mutationFn: ({ id, read_status }: MessageToUpdate) =>
            updateReadStatus({ id, read_status }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['messages'],
            })
            await queryClient.refetchQueries({ queryKey: ['messages'] })
        },
        onError: () =>
            console.error('Wystąpił bład podczas zmiany statusu wiadomości'),
    })

    return { updateMessageStatus }
}
