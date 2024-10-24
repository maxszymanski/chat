import { useForm } from 'react-hook-form'
import { useUser } from '../hooks/useUser'
import { useFriend } from '../hooks/useFriend'
import { useSendMessage } from '../hooks/useSendMessage'
import { MessageType } from '../types/types'
import { useRef } from 'react'
import FileArea from './FileArea'
import { HandThumbUpIcon } from '@heroicons/react/16/solid'

function ChatMessage() {
    const { user } = useUser()
    const { friendId } = useFriend()
    const { sendMessage } = useSendMessage()
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const {
        register,
        handleSubmit,
        // formState: { errors },
        reset,
        watch,
    } = useForm<MessageType>()

    const inputValue = watch('content')?.trim()

    const like = `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-10 text-blue-700"
                >
                    <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                </svg>`

    const onSubmit = ({ content }: { content: string }) => {
        const trimmedContent = content.trim()
        if (!trimmedContent) return

        const newMessage = {
            sender_id: user?.id || '1',
            receiver_id: friendId || '2',
            content: trimmedContent,
        }

        sendMessage(newMessage, {
            onSuccess: () => {
                reset()
                if (textareaRef.current)
                    textareaRef.current.style.height = `32px`
            },
        })
    }
    const sendLike = () => {
        if (!inputValue) {
            const newMessage = {
                sender_id: user?.id || '1',
                receiver_id: friendId || '2',
                content: like,
            }

            sendMessage(newMessage)
        }
    }
    const handleInput = () => {
        if (textareaRef.current) {
            if (
                textareaRef.current.style.height === 'auto' ||
                textareaRef.current.style.height === '32px'
            ) {
                textareaRef.current.style.height = '32px'
            }
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    return (
        <div className="px-2">
            <form
                className="py-3 w-full flex items-center gap-2 justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FileArea />
                <textarea
                    className="px-3  rounded-2xl bg-blue-100 font-normal border border-transparent hover:border-slate-200 focus:outline-none focus:border-slate-200  py-1 w-full text-base resize-none overflow-hidden h-8"
                    id="message"
                    autoComplete="off"
                    {...register('content', {
                        required: true,
                        onChange: handleInput,
                    })}
                    onInput={handleInput}
                    ref={(e) => {
                        register('content').ref(e)
                        textareaRef.current = e
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmit(onSubmit)()
                        }
                    }}
                />

                <button
                    type={inputValue ? 'submit' : 'button'}
                    className="p-2 text-blue-700"
                    onClick={sendLike}
                >
                    {inputValue ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-6 text-blue-700 h-6"
                        >
                            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                        </svg>
                    ) : (
                        <HandThumbUpIcon className="w-6 h-6" />
                    )}
                </button>
            </form>
        </div>
    )
}

export default ChatMessage
