function ChatMessage() {
    const sentMessage = (e) => {
        e.preventDefault()
    }

    return (
        <form className="py-3 px-6 flex gap-5" onSubmit={sentMessage}>
            <input className=" px-3 w-full rounded-full bg-blue-100 font-normal border border-transparent hover:border-slate-200 focus:outline-none focus:border-slate-200" />
            <button
                type="submit"
                className="px-6 py-1 border border-slate-200 rounded-full"
            >
                Send
            </button>
        </form>
    )
}

export default ChatMessage
