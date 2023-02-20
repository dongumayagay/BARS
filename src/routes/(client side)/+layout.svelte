<script>
	import { currentInterface } from "$lib/stores.js"
	import Header from "$lib/components/Header.svelte";
	import { onMount } from "svelte";

	onMount(()=>{
		$currentInterface = "client";
	})

	const title = 'Welcome to Barangay Appointment and Request System';
	const links = [
		{
			path: './',
			name: 'Homepage'
		},
		{
			path: '/document-request',
			name: 'Request Documents'
		},
		{
			path: '/appointment-request',
			name: 'Make an Appointment'
		},
		{
			path: '/ticket-tracker',
			name: 'Ticket Tracker'
		}
	]

</script>
<Header {title} {links}/>


<slot />
