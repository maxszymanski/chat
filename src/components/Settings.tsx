import {
    ChatBubbleLeftEllipsisIcon,
    LockClosedIcon,
    PencilIcon,
    UserIcon,
} from '@heroicons/react/24/outline'
import { useChatContext } from '../context/useChatContext'

function Settings() {
    const { openModal } = useChatContext()

    const defaultClass =
        'py-3 px-1 flex items-center gap-2 w-full text-left text-lg md:px-12 md:py-5 hover:text-sky-600 duration-300 transition-colors'

    return (
        <div className="flex flex-col text-sky-900 items-start divide-y  divide-stone-200 w-full md:py-6 ">
            <button
                className={defaultClass}
                onClick={() => openModal('username')}
            >
                <UserIcon className="w-6 h-6 " />
                Zmień imię użytkownika
            </button>
            <button
                className={defaultClass}
                onClick={() => openModal('status')}
            >
                <ChatBubbleLeftEllipsisIcon className="w-6 h-6 " />
                Zmień status chatu
            </button>
            <button className={defaultClass} onClick={() => openModal('about')}>
                <PencilIcon className="w-6 h-6 " />
                Zmień opis
            </button>
            <button
                className={defaultClass}
                onClick={() => openModal('password')}
            >
                <LockClosedIcon className="w-6 h-6 " />
                Zmień hasło
            </button>
        </div>
    )
}

export default Settings
