import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAlertStatus } from '../services/apiChat'
import { MessageAlertToUpdate } from '../types/types'

export function useUpdateAlertStatus() {
    const queryClient = useQueryClient()
    const { mutate: updateMessageAlertStatus } = useMutation({
        mutationFn: ({ id, alert }: MessageAlertToUpdate) =>
            updateAlertStatus({ id, alert }),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['messages'],
            })
            queryClient.refetchQueries({ queryKey: ['messages'] })
        },
        onError: () =>
            console.error('Wystąpił bład podczas zmiany statusu wiadomości'),
    })

    return { updateMessageAlertStatus }
}
