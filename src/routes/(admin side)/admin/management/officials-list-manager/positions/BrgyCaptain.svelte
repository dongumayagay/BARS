<script>
    import { createEventDispatcher } from "svelte"; 

    export let captain;
    const dispatch = createEventDispatcher();

    function addHandler(){
        dispatch("add", {
            position: "Barangay Captain",
            posisyon: "Punong Barangay", 
            positionOrder: 3
        })
    }

    function editHandler(captain){
        dispatch("edit", {
            ...captain
        })
    }
</script>


<section class="w-full h-full flex items-center justify-center">
    {#if !!captain}
        <button class="w-1/2 lg:w-1/3 h-[70%] bg-neutral flex flex-col justify-center items-center rounded-xl shadow-xl hover:scale-105 transition-all duration-150" on:click={editHandler(captain)}>
            <p class="font-semibold">{captain?.name??""}</p>
            <small>{captain?.position??""}</small>
        </button>
    {:else} 
        <button class="w-1/3 flex flex-col items-center justify-center bg-primary p-2 rounded-xl shadow-xl hover:scale-105 transition-all duration-150" on:click={addHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p>Add Barangay Captain</p> 
        </button>
    {/if}
</section>