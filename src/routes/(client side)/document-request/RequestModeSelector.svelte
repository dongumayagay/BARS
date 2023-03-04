<script>
    import { createEventDispatcher } from "svelte";
    export let page;
    const dispatch = createEventDispatcher();

    let isRequestForSomeone = false;
    let minor = true;

    function dispatchHandler(){
        // onlineRequest = mode;
        dispatch("next", {
            isRequestForSomeone
        })
    }

    function minorDispatchHandler(){
        dispatch("next", {
            minor
        })
    }
</script>

<section class="w-full min-h-screen flex flex-col justify-start items-center gap-10 pt-10" class:hidden={page!==0}>
    <p class="h-[5vh] flex items-center font-semibold">What can we help for your document request?</p>
    <div class="lg:w-[80%] flex flex-col lg:flex-row lg:flex-wrap lg:justify-center gap-10">
        <button class="lg:w-[25vw] lg:h-[25vw] bg-neutral flex lg:flex-col justify-center items-center gap-2 rounded-lg shadow-lg hover:scale-110 transition-transform duration-150 p-6 lg:p-0" on:click={()=>{isRequestForSomeone = false; dispatchHandler()}}>
            <!-- <i class="fa-solid fa-cloud-arrow-up text-[5vh] lg:text-[5vw] text-info"></i> -->
            <i class="fa-solid fa-user text-[15vh] lg:text-[5vw] text-info"></i>
            <p class="text-xl font-semibold">I want to submit a request for myself</p>
        </button>
        <button class="lg:w-[25vw] lg:h-[25vw] bg-neutral flex lg:flex-col justify-center items-center gap-2 rounded-lg shadow-lg hover:scale-110 transition-transform duration-150 p-6 lg:p-0" on:click={()=>{isRequestForSomeone = true; dispatchHandler()}}>
            <!-- <i class="fa-solid fa-person-walking-arrow-right text-[5vh] lg:text-[5vw] text-success"></i> -->
            <i class="fa-solid fa-handshake-angle text-[15vh] lg:text-[5vw] text-success"></i>
            <p class="text-xl font-semibold">I want to submit a request for someone</p>
        </button>
        <button class="lg:w-[25vw] lg:h-[25vw] bg-neutral flex lg:flex-col justify-center items-center gap-2 rounded-lg shadow-lg hover:scale-110 transition-transform duration-150 p-6 lg:p-0" on:click={()=>minorDispatchHandler()}>
            <!-- <i class="fa-solid fa-person-walking-arrow-right text-[5vh] lg:text-[5vw] text-success"></i> -->
            <!-- <i class="fa-solid fa-handshake-angle text-[5vh] lg:text-[5vw] text-success"></i> -->
            <i class="fa-solid fa-children text-[15vh] lg:text-[5vw] text-success"></i>
            <p class="text-xl font-semibold">I am minor or requesting for a minor</p>
        </button>
    </div>
</section>