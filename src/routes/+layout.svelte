<script>
	import '../app.postcss';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" 
		integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" 
		crossorigin="anonymous" referrerpolicy="no-referrer" 
	/>
</svelte:head>

<main class="lg:p-6 min-h-screen bg-gradient-to-b from-base-200 to-base-100">
	<slot />
</main>
