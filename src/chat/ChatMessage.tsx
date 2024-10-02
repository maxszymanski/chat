import { useForm } from 'react-hook-form'
import { useUser } from '../users/useUser'
import { useFriend } from './useFriend'
import { useSendMessage } from './useSendMessage'
import { MessageType } from '../types/types'

function ChatMessage() {
    const { user } = useUser()
    const { userId } = useFriend()
    const { sendMessage } = useSendMessage()
    const {
        register,
        handleSubmit,
        // formState: { errors },
        reset,
    } = useForm<MessageType>()

    const onSubmit = ({ content }: { content: string }) => {
        const newMessage = {
            sender_id: user?.id,
            receiver_id: userId,
            content,
        }

        sendMessage(newMessage, {
            onSuccess: () => {
                reset()
            },
        })
    }

    return (
        <form
            className="py-3 px-6 flex gap-5"
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                className=" px-3 w-full rounded-full bg-blue-100 font-normal border border-transparent hover:border-slate-200 focus:outline-none focus:border-slate-200"
                id="message"
                type="text"
                {...register('content', {
                    required: true,
                })}
            />
            <button
                type="submit"
                className="px-6 py-1 border border-slate-200 rounded-full"
            >
                Send
            </button>
        </form>
    )
}

export default ChatMessage
