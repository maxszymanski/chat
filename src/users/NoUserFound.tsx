import { InformationCircleIcon } from '@heroicons/react/24/outline'
import UserHeader from '../components/UserHeader'

function NoUserFound() {
    return (
        <>
            <UserHeader />
            <div
                className="flex-1 overflow-y-auto px-6 py-6 text-lg relative scrollbar-thin
            scrollbar-thumb-sky-300 scrollbar-track-sky-100 flex items-center justify-center lg:text-xl text-sky-500 xl:text-3xl flex-col gap-5 xl:gap-12"
            >
                <InformationCircleIcon className="size-44" />
                <p className=" text-center">
                    Nie znaleziono użytkownika{' '}
                    <span className="mt-2 block xl:mt-4">
                        Proszę spróbować ponownie
                    </span>
                </p>
            </div>
        </>
    )
}

export default NoUserFound
