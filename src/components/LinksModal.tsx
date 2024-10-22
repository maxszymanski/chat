import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useClickOutside from '../hooks/useClickOutside'

function LinksModal({ id, onClick }: { id: string; onClick: () => void }) {
    const modalRef = useRef(null)
    useClickOutside(modalRef, onClick)

    return (
        <div
            ref={modalRef}
            className={` absolute top-[3.3rem] left-8 bg-slate-100 border border-stone-200 z-[1000] rounded-xl overflow-hidden`}
        >
            <Link
                to={`/account/${id}`}
                className="block w-full px-6 py-5 hover:bg-blue-200  transition-colors duration-300 text-blue-950 border-b border-stone-200"
            >
                Przejdź do profilu
            </Link>
            <Link
                to={`/chat/${id}`}
                className="block w-full px-6 py-5 hover:bg-blue-200  transition-colors duration-300 text-blue-950"
            >
                Przejdź do chatu
            </Link>
        </div>
    )
}

export default LinksModal
