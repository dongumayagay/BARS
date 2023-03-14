<script>
	import { createEventDispatcher } from 'svelte';
	import { db } from "$lib/firebase/client.js";
	import { getDocs, collection, where, query } from 'firebase/firestore';
	import { onMount } from "svelte";
	import { userStore } from "$lib/stores.js"

	const dispatch = createEventDispatcher();
	const links = [
		{name: 'Announcements'},
		{name: 'Documents List'},
		{name: 'Officials List'},
	] 

	let captainEmail;
    onMount(async ()=>{
        const captainRef = await getDocs(query(collection(db, "adminUsers"), where("position", "==", "captain")))
        captainEmail = captainRef.docs.at(0).data().email
        console.log(console.log(captainEmail))
    })
	
	export let managementPage;
	let showMenu = false;
</script>

<div class="w-full flex p-4 lg:pt-4 lg:pb-0 lg:px-4 bg-neutral lg:rounded-t-lg relative" class:rounded-b-none={showMenu}>
	<section class="w-full flex flex-col items-center justify-center flex-1">
		<button class="w-[90%] lg:hidden btn btn-ghost hover:bg-neutral text-center relative">
			<input type="checkbox" class=" absolute opacity-0 w-full h-full" bind:checked={showMenu} />
			<p class="font-bold">{links[managementPage].name}</p>
		</button>
		{#if !!$userStore}
		<nav class="w-full items-end flex-1 hidden lg:flex justify-evenly tabs">
			{#each links as link, index}
				<button
					on:click={()=>{
						dispatch("switchTab", {index})
					}}
					class="tab tab-lifted border-b-0 font-semibold {managementPage === index ? "tab-active translate-y-[1px] " : ""}"
					disabled={link.name === "Officials List" && captainEmail !== $userStore.email}
				>
					{link.name}
				</button>
			{/each}
		</nav>
		{/if}
	</section>
	<section class="absolute right-[5%] flex flex-col items-center justify-center lg:hidden">
		<label class="btn btn-circle btn-ghost swap swap-rotate">
			<!-- this hidden checkbox controls the state -->
			<input type="checkbox" class="invisible" bind:checked={showMenu} />

			<!-- hamburger icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 swap-off"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
			</svg>

			<!-- close icon -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6 swap-on"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</label>
	</section>
</div>
{#if showMenu}
	<nav class="flex flex-col gap-2 p-4 bg-neutral rounded-b-2xl lg:hidden">
		{#each links as link, index}
			<button
				class="bg-neutral border-none text-gray-500 hover:text-black hover:bg-neutral hover:underline btn"
				on:click={()=>{
					showMenu = false;
					dispatch("switchTab", {index})
				}}
				class:hidden={managementPage === index}
			>
				{link.name}
			</button>
		{/each}
	</nav>
{/if}
