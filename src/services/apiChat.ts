import supabase from './supabase'

export async function getMyMessages() {
	const { data, error } = await supabase
		.from('messages')
		.select('*')
		.or(`sender_id.eq.5648ef33-1038-4fda-b838-6e4e89b4249a,receiver_id.eq.5648ef33-1038-4fda-b838-6e4e89b4249a`)
		.order('created_at', { ascending: true })

	if (error) {
		console.error('Error fetching messages:', error)
		return []
	}
	return data
}
