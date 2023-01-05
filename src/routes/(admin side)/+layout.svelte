<script>
	import Header from "$lib/components/Header.svelte";
	import { adminUser } from "$lib/stores.js";

	const title = "Welcome " + $adminUser?.email
	const links = [
		{
			path: '../admin/dashboard',
			name: 'Dashboard'
		},
		{
			path: '../admin/requests',
			name: 'Requests'
		},
		{
			path: '../admin/make-announcement',
			name: 'Announcement'
		}
	] 

</script>

{#if $adminUser !== null}
	<Header {title} {links}/>	
{/if}
<slot />
