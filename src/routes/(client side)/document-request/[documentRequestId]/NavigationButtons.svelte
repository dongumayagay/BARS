<script>
    import { createEventDispatcher } from "svelte";

    export let page;

    const dispatch = createEventDispatcher();

</script>

<nav class="w-full lg:w-[10vw] flex lg:flex-col items-center justify-center gap-3 tabs-boxed bg-inherit rounded-none">
    <button class="tab h-max {page === 0 ? "tab-active font-semibold " : ""}" on:click={()=>dispatch("navigate", { index: 0})}>Request Details</button>
    <button class="tab {page === 1 ? "tab-active font-semibold " : ""} " on:click={()=>dispatch("navigate", { index: 1})}>Messages</button>
</nav>