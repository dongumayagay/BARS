<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const links = [
		{name: 'Announcements'},
		{name: 'Documents List'},
		{name: 'Officials List'},
	] 
	
	export let managementPage;
	let showMenu = false;
</script>

<div class="w-full flex pt-4 px-4 bg-neutral lg:rounded-t-lg" class:rounded-b-none={showMenu}>

	<section class="flex flex-col flex-1 ">

		<nav class="items-end flex-1 hidden lg:flex justify-evenly tabs">
			{#each links as link, index}
				<button
					on:click={()=>{
						dispatch("switchTab", {index})
					}}
					class="tab tab-lifted border-b-0 font-semibold {managementPage === index ? "tab-active translate-y-[1px]" : ""}"
				>
					{link.name}
				</button>
			{/each}
		</nav>
	</section>
	<!-- <section class="flex flex-col items-center justify-center lg:hidden">
		<label class="btn btn-circle btn-ghost swap swap-rotate">
			<input type="checkbox" class="invisible" bind:checked={showMenu} />

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
	</section> -->
</div>

