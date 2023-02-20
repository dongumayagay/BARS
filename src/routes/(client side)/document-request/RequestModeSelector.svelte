<script>
    import { createEventDispatcher } from "svelte";
    export let page;
    const dispatch = createEventDispatcher();

    let onlineRequest = true;

    function dispatchHandler(){
        // onlineRequest = mode;
        dispatch("next", {
            onlineRequest
        })
    }
</script>

<section class="w-full min-h-screen flex flex-col justify-start items-center gap-10 pt-10" class:hidden={page!==0}>
    <p class="h-[5vh] flex items-center font-semibold">Select the the type of your document request</p>
    <div class="flex flex-col lg:flex-row gap-10">
        <button class="w-[25vh] h-[25vh] lg:w-[25vw] lg:h-[25vw] bg-neutral flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg hover:scale-110 transition-transform duration-150" on:click={()=>{onlineRequest = true; dispatchHandler()}}>
            <i class="fa-solid fa-cloud-arrow-up text-[5vh] lg:text-[5vw] text-info"></i>
            <p class="text-xl font-semibold">Online</p>
        </button>
        <button class="w-[25vh] h-[25vh] lg:w-[25vw] lg:h-[25vw] bg-neutral flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg hover:scale-110 transition-transform duration-150" on:click={()=>{onlineRequest = false; dispatchHandler()}}>
            <i class="fa-solid fa-person-walking-arrow-right text-[5vh] lg:text-[5vw] text-success"></i>
            <p class="text-xl font-semibold">Walk-In</p>
        </button>
    </div>
</section>