<script>
	export let links = [
		{
			path: '/',
			name: 'Homepage'
		}
	];

	let showMenu = false;
</script>

<div class="flex py-2 px-4 bg-neutral lg:rounded-t-lg" class:rounded-b-none={showMenu}>

	<section class="flex flex-col flex-1 ">

		<nav class="items-end flex-1 hidden lg:flex justify-evenly">
			{#each links as link}
				<a
					href={link.path}
					class="bg-orange-300 border-none rounded hover:bg-orange-200 text-white btn"
				>
					{link.name}
				</a>
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
	<nav class="flex flex-col gap-2 p-4 bg-neutral rounded-b-2xl lg:hidden">
		{#each links as link}
			<a href={link.path} 
				class="bg-neutral border-none text-gray-500 hover:text-black hover:bg-neutral hover:underline btn"
				on:click={()=>showMenu=false}>
				{link.name}
			</a>
		{/each}
	</nav>
{/if}

