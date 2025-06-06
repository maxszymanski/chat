import { useForm } from 'react-hook-form'
import { useUser } from '../hooks/useUser'
import { useFriend } from '../hooks/useFriend'
import { useSendMessage } from '../hooks/useSendMessage'
import { MessageType } from '../types/types'
import { useRef, useState } from 'react'
import FileArea from './FileArea'
import { HandThumbUpIcon, PaperAirplaneIcon } from '@heroicons/react/16/solid'
import { useParams } from 'react-router-dom'
import { useSendFile } from '../hooks/useSendFile'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Spinner from '../components/Spinner'

const ANONYMOUS_USER_ID = '00000000-0000-0000-0000-000000000000'

function ChatMessage() {
    const [file, setFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const { userId } = useParams()
    const { user } = useUser()
    const { friendId } = useFriend(userId || ANONYMOUS_USER_ID)
    const { sendMessage } = useSendMessage()
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const { register, handleSubmit, reset, watch } = useForm<MessageType>()
    const { sendFile, isSendingFile } = useSendFile()

    const inputValue = watch('content')?.trim()

    const like = `<svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    
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

    const clearPreview = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl)
            setPreviewUrl(null)
        }
    }

    const handleClearFile = () => {
        setFile(null)
        clearPreview()
    }

    const handleSendFile = () => {
        if (file) {
            const newMessage: MessageType = {
                sender_id: user?.id || '1',
                receiver_id: friendId || '2',
                content: '',
            }
            const fileAndMessage = { file, newMessage }
            sendFile(fileAndMessage, { onSuccess: () => handleClearFile() })
        }
    }

    return (
        <div className="px-2">
            <form
                className="py-3 w-full flex items-center gap-2 justify-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FileArea setFile={setFile} setPreviewUrl={setPreviewUrl} />
                {previewUrl ? (
                    <div className="bg-sky-200 w-full px-5 items-center  rounded-2xl flex gap-2  py-0.5">
                        <img
                            className="h-12 w-12 rounded-lg "
                            src={previewUrl}
                            alt="podgląd"
                        />
                        {!isSendingFile ? (
                            <button
                                className=" text-stone-950  p-2 duration-300 transition-colors xl:hover:text-stone-600"
                                onClick={handleClearFile}
                            >
                                <XMarkIcon className="size-4" />
                            </button>
                        ) : (
                            <>
                                <Spinner />{' '}
                                <span className="hidden text-sm xl:text-base md:block">
                                    Wysyłanie zdjęcia
                                </span>
                            </>
                        )}
                    </div>
                ) : (
                    <textarea
                        className="px-3  rounded-2xl bg-sky-200 font-normal border border-transparent hover:border-slate-200 focus:outline-none focus:border-slate-200  py-1 w-full text-base resize-none overflow-hidden h-8  placeholder:invisible focus:placeholder:visible placeholder:text-slate-400"
                        id="message"
                        autoComplete="off"
                        placeholder="Napisz wiadomość..."
                        disabled={file ? true : false}
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
                )}

                <button
                    type={inputValue ? 'submit' : 'button'}
                    className="p-2 text-sky-500 duration-300 transition-colors xl:hover:text-sky-400"
                    onClick={file ? handleSendFile : sendLike}
                >
                    {!isSendingFile ? (
                        (inputValue || file) && !isSendingFile ? (
                            <PaperAirplaneIcon className="size-6" />
                        ) : (
                            <HandThumbUpIcon className="w-6 h-6" />
                        )
                    ) : (
                        <Spinner />
                    )}
                </button>
            </form>
        </div>
    )
}

export default ChatMessage
