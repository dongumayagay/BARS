<script>
	import Links from "./Links.svelte";

    let showMenu = false;
</script>

<section class="hidden min-w-[30%] h-[65vh] p-6 bg-neutral lg:flex items-start rounded-xl shadow-xl tabs">
    <Links />
</section>

<section class="lg:hidden fixed top-0 h-[100%] flex items-center {showMenu ? "bg-black/50 w-screen " : ""} z-20 transition-all duration-500">
    <div class="fixed -left-[230px] bg-neutral flex flex-col gap-4 h-screen pt-[20vh] p-4 border-r-2 border-primary {showMenu ? "translate-x-[230px]" : ""} duration-500">
        <Links on:closeMenu={() => showMenu = false} />
    </div>
    <label class="py-10 bg-neutral rounded-r-xl swap swap-rotate border-2 border-primary border-l-2 border-l-neutral mt-32 {showMenu ? "h-max right-[1px] translate-x-[230px]" : ""} duration-500">
        <input type="checkbox" class="invisible" bind:checked={showMenu} />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 swap-off text-primary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 swap-on text-primary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
        </svg>
    </label>
</section>
