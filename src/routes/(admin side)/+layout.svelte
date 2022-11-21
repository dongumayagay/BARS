<script>
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';
</script>

<div class="drawer drawer-mobile">
	<input id="admin-sidebar" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Page content here -->
		<Navbar />
		<slot />
	</div>
	<Sidebar />
</div>
