<script>
	import Header from "$lib/components/Header.svelte";
	import { userStore, currentPage, currentInterface, adminUsers } from "$lib/stores.js";
	import {goto} from "$app/navigation";
	import { db } from "$lib/firebase/client.js"
	import { onMount } from "svelte";
	import { collection, getDocs } from "firebase/firestore";

	let ifAdmin;
    // onMount(async ()=>{
    //     const userEmails = await getDocs(collection(db, "adminUsers"))
	// 	$adminUsers = userEmails.docs.map((doc)=>({...doc.data()}))
	// 	if(!!userStore) {ifAdmin = $adminUsers.find(item => $userStore.email === item.email)}
	// 	console.log($adminUsers)
    // })

	// onMount(()=>{
		$currentPage = 0;
		$currentInterface = "admin";
	// }) 


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
			path: '../admin/management',
			name: 'Management'
		}
	] 

	$: title = "Welcome " + $userStore?.email
	

	function logOutHandler() {
		goto("../admin")
	}

	// $: if(!!userStore) {ifAdmin = $adminUsers.find(item => $userStore.email === item.email)}
</script>

{#if !!$userStore && $userStore.email === "user@sample.com"}
<Header {title} {links} on:logout={logOutHandler}/>	
{/if}
<!-- {#if !!ifAdmin} -->
	<slot />
<!-- {/if} -->
