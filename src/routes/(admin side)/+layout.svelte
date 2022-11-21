<script>

	import Header from "$lib/components/Header.svelte";


	const title = "Welcome Admin"
	const links = [
		{
			path: '/admin',
			name: 'Dashboard'
		},
		{
			path: '/admin/document-appointment-request',
			name: 'Requests'
		},
		{
			path: '/admin/make-annoucement',
			name: 'Announcement'
		}
	] 

</script>
<Header {title} {links}/>


<slot />