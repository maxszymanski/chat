import { RefObject } from 'react'

function ModalLayout({
    children,
    modalRef,
}: {
    children: React.ReactNode
    modalRef: RefObject<HTMLDivElement>
}) {
    return (
        <div className="inset-0 w-full h-full bg-black/35 absolute flex justify-center items-center px-4">
            <div
                className="bg-stone-100 p-8 rounded-xl text-center "
                ref={modalRef}
            >
                {children}
            </div>
        </div>
    )
}

export default ModalLayout
