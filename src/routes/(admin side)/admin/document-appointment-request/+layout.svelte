<script>

	import DAHeader from "$lib/components/DAHeader.svelte";


	const links = [
		{
			path: '/admin/document-appointment-request/waiting-list',
			name: 'Waiting List'
		},
		{
			path: '/admin/document-appointment-request/to-claim-documents',
			name: 'To Claim Documents'
		},
		{
			path: '/admin/document-appointment-request/approved-appointments',
			name: 'Approved Appointments'
		},
        {
			path: '/admin/document-appointment-request/history',
			name: 'History'
		},
        {
			path: '/admin/document-appointment-request/trash',
			name: 'Trash'
		}
	] 

</script>
<DAHeader {links}/>


<slot />