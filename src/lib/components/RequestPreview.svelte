<script>
    import { createEventDispatcher } from "svelte";

    export let requestData;

    const dispatch = createEventDispatcher();

    function dispatchHandler() {
        dispatch("view", {
            requestData
        })
    }
</script>

<button class="w-full h-max bg-primary flex justify-between items-center py-2 px-4 rounded-xl group" on:click={dispatchHandler}>
    <div class="w-full flex flex-col items-start">
        <p class="text-small font-semibold">{requestData.lastName}, {requestData.firstName} {requestData.middleName}</p>
        <small>{requestData.requestId}</small>
    </div>
    <div class="opacity-0 w-max flex items-center border-l-[1px] border-accent dark:border-inherit group-hover:opacity-100 px-2 transition-opacity duration-200">
        <p class="text-[12px]">Click to view</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        </svg>
    </div>
</button>