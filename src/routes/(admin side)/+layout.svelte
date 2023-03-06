<script>
	import Header from "$lib/components/Header.svelte";
	import { userStore, currentPage, currentInterface, adminUsers } from "$lib/stores.js";
	import {goto} from "$app/navigation";
	import { db,auth } from "$lib/firebase/client.js"
	import { onMount } from "svelte";
	import { collection, getDoc, getDocs, doc } from "firebase/firestore";
	import CloseButton from "./account-settings-components/CloseButton.svelte";
	import AccountCredentials from "./account-settings-components/AccountCredentials.svelte";
	import Password from "./account-settings-components/Password.svelte";
	import BasicInfo from "./account-settings-components/BasicInfo.svelte";
	import { signOut } from "firebase/auth";

	// let ifAdmin;
    // onMount(async ()=>{
    //     const userEmails = await getDocs(collection(db, "adminUsers"))
	// 	$adminUsers = userEmails.docs.map((doc)=>({...doc.data()}))
	// 	if(!!userStore) {ifAdmin = $adminUsers.find(item => $userStore.email === item.email)}
	// 	console.log($adminUsers)
    // })
	async function ifAdmin(){
		try {
			const isAdmin = await getDoc(doc(db, "adminUsers", $userStore.uid))
			console.log(isAdmin.exists())
			return isAdmin;
		} catch (error) {
			alert(error.message)
		}
	}

	// onMount(()=>{
	// 	console.log(ifAdmin().then())
	// 	if(!!$userStore && ifAdmin()===false){
	// 		signOut(auth)
	// 	}
	// }) 
		
		$currentPage = 0;
		$currentInterface = "admin";

	let title;

	let showSettings;
	let otherModalOpened = false;
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

	
	// $: if(!!$userStore && ifAdmin()===false)
	// $: console.log(showSettings)
	// $: if(!!userStore) {ifAdmin = $adminUsers.find(item => $userStore.email === item.email)}
</script>

{#if !!$userStore}
	{#await ifAdmin()}
		<p>Checking your session token....</p>
	{:then isAdmin} 
	 	{#if isAdmin.exists()}
			<Header {title} {links} on:logout={logOutHandler} on:showSettings={()=>showSettings=true}/>
			{#if showSettings}
				<main class="absolute top-0 left-0 w-screen min-h-[200%] h-max flex flex-col items-center gap-3 bg-gradient-to-b from-base-200 to-base-100 z-100">
					<CloseButton on:closeSettings={()=>showSettings=false}/>
					<AccountCredentials {otherModalOpened} on:open={()=>otherModalOpened=true} on:close={()=>otherModalOpened=false}/>
					<Password {otherModalOpened} on:open={()=>otherModalOpened=true} on:close={()=>otherModalOpened=false}/>
					<BasicInfo {otherModalOpened} on:open={()=>otherModalOpened=true} on:close={()=>otherModalOpened=false}/>
				</main>
			{:else}
				<slot/>
			{/if}
		{:else}
		<div class="w-screen h-screen flex flex-col justify-center items-center">
			<img src="/taph-taph.gif" alt="stap" class="w-[400px] h-[400px]">
			<p class="font-semibold">Stop right there!! You are not supposed to be here</p>
			<button class="btn btn-success" on:click={()=>goto("./")}>
				Go Back to Homepage
			</button>
		</div>
		{/if}
	{/await}
{:else}
<slot />
{/if}
				
