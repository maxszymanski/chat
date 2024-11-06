import Spinner from './Spinner'

function HomeFormButton({
    isPending,
    text,
}: {
    isPending: boolean
    text: string
}) {
    return (
        <button
            type="submit"
            className="w-full p-2 bg-primary rounded-2xl font-medium text-stone-100 transition-colors duration-300 hover:bg-[#3868af] flex items-center justify-center gap-2 md:text-xl text-lg"
            disabled={isPending}
        >
            {isPending && <Spinner />} {text}
        </button>
    )
}

export default HomeFormButton
