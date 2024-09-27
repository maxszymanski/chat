import { useEffect, useState } from 'react'
import { getMyMessages } from '../services/apiChat'

function ChatMain() {
	const [messages, setMessages] = useState([])

	useEffect(() => {
		const fetchMessages = async () => {
			const fetchedMessages = await getMyMessages()
			setMessages(fetchedMessages) //
		}

		fetchMessages()
	}, [])

	console.log(messages)

	return (
		<main className="flex-1  overflow-y-auto px-12 text-sm font-semibold py-6">
			<ul className="flex flex-col justify-end gap-4">
				{messages.map(message => (
					<p
						key={message.id}
						className={` p-3 max-w-60  rounded-2xl  w-fit ${
							message.sender_id === '5648ef33-1038-4fda-b838-6e4e89b4249a'
								? 'bg-white self-start'
								: 'bg-blue-300 self-end '
						}`}>
						{message.content}
					</p>
				))}
			</ul>
			{/* <div className="flex flex-col justify-end gap-4">
				<p className="bg-white p-3 max-w-60  rounded-2xl  w-fit">Hej</p>
				<p className="bg-white p-3 max-w-60  rounded-2xl  w-fit">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos at, quis aliquid tempore provident
					ipsum placeat saepe aperiam. Veritatis, inventore.
				</p>
				<p className="bg-blue-300 p-3 max-w-60  rounded-2xl   self-end items">Hello</p>
				<p className="bg-blue-300 p-3 max-w-60 rounded-2xl  self-end">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos at, quis aliquid tem
				</p>
				<p className="bg-blue-300 p-3 max-w-60 rounded-2xl  self-end">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, officiis?
				</p>
				<p className="bg-blue-300 p-3 max-w-60 rounded-2xl  self-end">Lorem ipsum dolor sit amet.</p>
				<p className="bg-white p-3 max-w-60  rounded-2xl  w-fit">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, obcaecati. Dicta, officiis voluptas?
					Eligendi, natus. 😂
				</p>
				<p className="bg-white p-3 max-w-60  rounded-2xl  w-fit">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, obcaecati. Dicta, officiis voluptas?
					Eligendi, natus.
				</p>
				<p className="bg-white p-3 max-w-60  rounded-2xl  w-fit">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, obcaecati. Dicta, officiis voluptas?
					Eligendi, natus.
				</p>
			</div> */}
		</main>
	)
}

export default ChatMain
