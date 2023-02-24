<script>
    import { createEventDispatcher } from "svelte";

    export let councilors;

    const dispatch = createEventDispatcher();

    function addHandler(){
        dispatch("add", {
            position: "Barangay Councilor", 
            positionOrder: 2
        })
    }

    function editHandler(councilor){
        dispatch("edit", {
            ...councilor
        })
    }

    $:console.log(councilors)
</script>

<section class="w-full h-full flex flex-wrap items-center justify-center gap-2">
    {#if councilors.length !== 0}
        {#each councilors as councilor}
            <button class="w-1/3 lg:w-[23%] h-full lg:h-[15vh] bg-neutral flex flex-col justify-center items-center rounded-xl shadow-lg hover:scale-105 transition-all duration-150" on:click={()=>editHandler(councilor)}>
                <p class="font-semibold">{councilor.name}</p>
                <small>{councilor.position}</small>
            </button>
        {/each}
    {/if}
    {#if councilors.length < 7} 
        <button class="w-1/3 lg:w-[23%] h-full lg:h-[15vh] flex flex-col items-center justify-center bg-primary p-2 rounded-xl shadow-xl hover:scale-105 transition-all duration-150" on:click={addHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p>Add Councilors</p> 
        </button>
    {/if}
</section>

