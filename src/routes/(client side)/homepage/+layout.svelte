<script>
	import HomepageHeader from "./HomepageHeader.svelte";
</script>

<main class="w-screen lg:w-full pt-6 flex gap-4 items-start">
    <HomepageHeader />
    <slot></slot>
</main>
