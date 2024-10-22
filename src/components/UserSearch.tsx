import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { ChangeEvent } from 'react'

function UserSearch({
    value,
    onClick,
}: {
    value: string
    onClick: (e: ChangeEvent) => void
}) {
    return (
        <div className="max-w-80 mx-auto w-full px-4 relative">
            <input
                className=" w-full p-1.5 mt-2 mb-5 bg-slate-50 rounded-xl px-4 outline-none focus:border-blue-500 border border-blue-100 transition-colors duration-300 hover:border-blue-500 text-blue-900 placeholder:text-slate-600 placeholder:text-sm "
                placeholder="Wyszukaj"
                value={value}
                onChange={onClick}
            />
            <MagnifyingGlassIcon className="absolute w-6 h-6 text-slate-500 top-4 right-8 pointer-events-none" />
        </div>
    )
}

export default UserSearch
