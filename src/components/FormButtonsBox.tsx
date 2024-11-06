function FormButtonsBox({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-4 mt-4 font-atma tracking-wider xl:gap-5 xl:mt-5">
            {children}
        </div>
    )
}

export default FormButtonsBox
