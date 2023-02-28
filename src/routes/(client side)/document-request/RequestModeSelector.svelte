<script>
    import { createEventDispatcher } from "svelte";
    export let page;
    const dispatch = createEventDispatcher();

    let isRequestForSomeone = false;

    function dispatchHandler(){
        // onlineRequest = mode;
        dispatch("next", {
            isRequestForSomeone
        })
    }
</script>

<section class="w-full min-h-screen flex flex-col justify-start items-center gap-10 pt-10" class:hidden={page!==0}>
    <p class="h-[5vh] flex items-center font-semibold">What can we help for your document request?</p>
    <div class="flex flex-col lg:flex-row gap-10">
        <button class="w-[25vh] h-[25vh] lg:w-[25vw] lg:h-[25vw] bg-neutral flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg hover:scale-110 transition-transform duration-150" on:click={()=>{isRequestForSomeone = false; dispatchHandler()}}>
            <!-- <i class="fa-solid fa-cloud-arrow-up text-[5vh] lg:text-[5vw] text-info"></i> -->
            <i class="fa-solid fa-user text-[5vh] lg:text-[5vw] text-info"></i>
            <p class="text-xl font-semibold">I want to submit a request for myself</p>
        </button>
        <button class="w-[25vh] h-[25vh] lg:w-[25vw] lg:h-[25vw] bg-neutral flex flex-col justify-center items-center gap-2 rounded-lg shadow-lg hover:scale-110 transition-transform duration-150" on:click={()=>{isRequestForSomeone = true; dispatchHandler()}}>
            <!-- <i class="fa-solid fa-person-walking-arrow-right text-[5vh] lg:text-[5vw] text-success"></i> -->
            <i class="fa-solid fa-handshake-angle text-[5vh] lg:text-[5vw] text-success"></i>
            <p class="text-xl font-semibold">I want to submit a request for someone</p>
        </button>
    </div>
</section>