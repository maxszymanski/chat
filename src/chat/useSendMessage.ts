import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMessage } from '../services/apiChat'

export function useSendMessage() {
    const queryClient = useQueryClient()
    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: createMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['messages'],
            })
        },
        onError: (err) => console.log(err),
    })
    return { isSending, sendMessage }
}
