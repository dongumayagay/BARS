<script>
	import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
    import { createEventDispatcher } from "svelte";
    import { db } from "$lib/firebase/client.js"

    const dispatch = createEventDispatcher();
    
    let officialsList = [];

    let selectedOfficial;

    const officialsListListener = onSnapshot(query(collection(db, "officialsList"), orderBy("positionOrder")), (querySnapshot)=>{
        officialsList = [];
        querySnapshot.forEach((doc)=>{
            officialsList = [...officialsList, {
                ...doc.data()
            }]
        })
    })

    function submitHandler() {
        dispatch("next", {
            selectedOfficial
        })
    }

    // $: console.log(selectedOfficial)

</script>

<form class="lg:col-span-3 h-full p-4 flex flex-col items-center justify-start lg:justify-center gap-4" on:submit|preventDefault={submitHandler} on:reset={(event)=>{event.target.reset(); selectedOfficial = undefined}}>
    <div class="flex justify-center">
        <p class="p-2 rounded-xl font-medium  text-center lg:w-fit">Who would you like to have an appointment with?</p>
    </div>
    <div class="flex flex-col gap-2">
        <p class="text-center">Below are the list of the Barangay Officials</p>
        <div class="flex flex-col gap-3">
            {#each officialsList as official}
                <div class="flex items-center gap-2">
                    <input value={official} type="radio" name="officials" class="radio radio-secondary" bind:group={selectedOfficial}>
                    <div class="w-full border-b-2 border-primary flex flex-col p-2">
                        <p class="w-full p-2 font-semibold text-center">{official.name}</p>
                        <small class="w-full text-center">({official.position})</small>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <section class="w-full pt-4 flex flex-col lg:flex-row gap-4 justify-around items-center ">
        <div class="flex justify-start gap-1">
            <button type="submit" class="btn btn-primary flex lg:gap-1" disabled={selectedOfficial == undefined}>
                <p>Next</p>
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button type="reset" class="btn btn-ghost hover:bg-neutral hover:underline hover:underline-offset-2" disabled={selectedOfficial == undefined}>Clear Form</button>
        </div>
        <button type="button" 
            class="btn btn-neutral p-3 lg:p-4 flex items-center gap-2 hover:bg-neutral group hover:border-none" 
            on:click={()=>dispatch("back")}
        >
            <i class="fa-solid fa-arrow-left"></i>
            <p class=" group-hover:underline group-hover:underline-offset-2">Go Back</p>
        </button>
    </section>
</form>