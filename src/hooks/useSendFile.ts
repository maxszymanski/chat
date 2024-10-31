import { useMutation, useQueryClient } from '@tanstack/react-query'
import { uploadFile } from '../services/apiChat' //
import popSound from '../chat/pop.mp3'

export function useSendFile() {
    const audio = new Audio(popSound)
    const queryClient = useQueryClient()

    const { mutate: sendFile, isPending: isSendingFile } = useMutation({
        mutationFn: uploadFile,
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

    return { isSendingFile, sendFile }
}
