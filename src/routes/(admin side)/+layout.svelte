<script>
	import Header from "$lib/components/Header.svelte";
	import { adminUser } from "$lib/stores.js";

	let title;
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

	$: title = "Welcome " + $adminUser?.email

</script>

{#if $adminUser !== null}
	<Header {title} {links}/>	
{/if}
<slot />
