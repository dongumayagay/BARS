<script>
	import Header from "$lib/components/Header.svelte";
	import { userStore, currentPage } from "$lib/stores.js";
	import {goto} from "$app/navigation"

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

	$: title = "Welcome " + $userStore?.email

	function logOutHandler() {
		$currentPage = 0;
		goto("../admin")
	}
</script>

{#if !!$userStore}
	<Header {title} {links} on:logout={logOutHandler}/>	
{/if}
<slot />
