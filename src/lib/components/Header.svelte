<script>
	import {currentPage} from "$lib/stores.js";
	import { goto } from '$app/navigation'

	const title = "Welcome to Barangay Appointment and Request System"
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

	let showMenu = false;
</script>


<div class="flex px-4 bg-neutral lg:rounded-2xl border-b-[1px] border-none " class:rounded-b-none={showMenu}>

	<section class="py-4">
		<!-- logo -->
		<img src="https://via.placeholder.com/100?text=BARS" alt="" class="mask mask-circle h-14 w-14 lg:w-[100px] lg:h-[100px]" />
	</section>
	<section class="flex flex-col flex-1 ">
		<!--  -->
		<h1 class=" text-center flex items-center justify-center flex-1 font-serif text-sm lg:text-xl">{title}</h1>

		<nav class="tabs items-end flex-1 hidden lg:flex justify-evenly ">
			{#each links as link, index}
				<button
					on:click={()=>{ 
						$currentPage = index; 
						goto(link.path)
					}}
					class="tab tab-lifted text-lg border-b-0 font-semibold"
					class:tab-active={$currentPage == index}
				>
					{link.name}
				</button>
			{/each}
		</nav>
	</section>
	<section class="flex flex-col items-center justify-center lg:hidden">
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
	<nav class="flex flex-col gap-2 p-4 bg-neutral rounded-b-2xl lg:hidden shadow-lg z-10">
		{#each links as link, index}
			<button type="button"
				on:click={()=>{ 
					$currentPage = index; 
					showMenu = false;
					goto(link.path)
				}}
				class="bg-neutral border-none text-gray-500 hover:text-black hover:bg-neutral hover:underline btn" 
				class:tab-active={$currentPage == index}
			>
				{link.name}
			</button>
		{/each}
	</nav>
{/if}
