<script>
	import {currentPage,currentInterface,userStore} from "$lib/stores.js";
	import {auth} from "$lib/firebase/client.js"
	import { goto } from '$app/navigation'
	import { createEventDispatcher } from "svelte";
	import { signOut } from "firebase/auth";

	export let title = "Welcome to Barangay Appointment and Request System"
	export let links = [
		{
			path: './',
			name: 'Homepage'
		},
		
	] 

	const dispatch = createEventDispatcher();

	let showMenu = false;

	function logOutHandler(){
		signOut(auth)
		.then(()=>{
			alert("Logged out successfully")
			dispatch("logout")
		}).catch((error) => {
			alert(error.message)
		});
	}
</script>


<div class="flex px-4 bg-neutral lg:rounded-2xl border-b-[1px] border-none " class:rounded-b-none={showMenu}>

	<section class="py-4">
		<!-- logo -->
		<img src="/brgyLogo.png" alt="" class="mask mask-circle h-14 w-14 lg:w-[100px] lg:h-[100px]" />
	</section>
	<section class="flex flex-col flex-1 ">
		<!--  -->
		<div class="w-full h-full flex {$userStore === undefined || $userStore === null ? "justify-center" : "justify-end"} p-2">
			<h1 class="w-full h-full text-center flex items-center justify-center flex-1 font-serif text-sm lg:text-xl">{title}</h1>
			{#if !!$userStore && $currentInterface === "admin"}
			<div class="dropdown dropdown-end">
				<button class="btn btn-sm w-max h-max">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
					</svg>
				</button>
				<button class="dropdown-content menu shadow-lg bg-neutral rounded-box w-max h-max">
					<li>
						<button class="flex justify-center hover:bg-neutral hover:underline" on:click={logOutHandler}>
							<small>Log Out</small>
						</button>
					</li>
				  <li><button class="flex justify-center hover:bg-neutral hover:underline">
						<small>Account Settings</small>
				  </button></li>
				  <!-- <li><a>Item 2</a></li> -->
				</button>
			  </div>
			{/if}
		</div>

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
