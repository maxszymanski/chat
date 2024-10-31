import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createMessage } from '../services/apiChat'
import popSound from '../chat/pop.mp3'

export function useSendMessage() {
    const audio = new Audio(popSound)
    const queryClient = useQueryClient()
    const { mutate: sendMessage, isPending: isSending } = useMutation({
        mutationFn: createMessage,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['messages'],
            })
            queryClient.refetchQueries({ queryKey: ['messages'] })
            queryClient.refetchQueries({ queryKey: ['users'] })
            setTimeout(() => {
                audio.play()
            }, 1000)
        },
        onError: (err) => console.log(err),
    })
    return { isSending, sendMessage }
}
