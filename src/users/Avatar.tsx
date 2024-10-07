function Avatar({ type = 'small' }: { type: string }) {
    return (
        <img
            src="/default-user.webp"
            className={` object-cover rounded-full ${type === 'small' ? 'w-9 h-9' : 'w-36 h-36'}`}
        />
    )
}

export default Avatar
