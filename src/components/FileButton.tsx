import { ReactNode } from 'react'

function FileButton({
    children,
    onClick,
}: {
    children: ReactNode
    onClick: () => void
}) {
    return (
        <button onClick={onClick} className="p-1 text-sky-500">
            {children}
        </button>
    )
}

export default FileButton
