<script>
    import { createEventDispatcher } from "svelte"; 
    
    export let skChairperson;
    const dispatch = createEventDispatcher();

    function addHandler(){
        dispatch("add", {
            position: "SK Chairperson", 
            positionOrder: 4
        })
    }

    function editHandler(skChairperson){
        dispatch("edit", {
            ...skChairperson
        })
    }
</script>


<section class="w-full h-full flex items-center justify-center">
    {#if !!skChairperson}
        <button class="w-[90%] h-[70%] bg-neutral flex flex-col justify-center items-center rounded-lg hover:scale-105 transition-all duration-150" on:click={editHandler(skChairperson)}>
            <p class="font-semibold">{skChairperson?.name??""}</p>
            <small>{skChairperson?.position??""}</small>
        </button>
    {:else} 
        <button class="flex flex-col items-center justify-center bg-primary p-2 rounded-xl shadow-xl hover:scale-105 transition-all duration-150" on:click={addHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p>Add an SK Chairperson</p> 
        </button>
    {/if}
</section>