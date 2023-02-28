<script>
    import { createEventDispatcher } from "svelte";

    // export let page;

    const dispatch = createEventDispatcher();

    let selectedPurpose = "";
    let others;

    function submitHandler(){
        if(selectedPurpose === "others") selectedPurpose = others;
        dispatch("next", { 
            selectedPurpose: (selectedPurpose === "others" ? others : selectedPurpose)
        })
    }

    $: console.log(selectedPurpose)
</script>

<form class="w-full flex flex-col items-center gap-4" on:submit|preventDefault={submitHandler}>
    <p>Select the purpose of your document</p>
    <select class="select select-neutral" required bind:value={selectedPurpose}>
        <option value="" disabled selected>Select Purpose</option>
        <option value="Iskolar ng Lungsod ng San Pedro Scholarship" >ILSP Scholarship</option>
        <option value="Iskolar ng Laguna Scholarship" >Iskolar ng Laguna</option>
        <option value="Calamity Loan" >Calamity Loan</option>
        <option value="Proof of Residency" >Proof of Residency</option>
        <option value="Business Permit" >Business Permit</option>
        <option value="Lending Requirements" >Lending Requirements</option>
        <option value="Mayor's Permit" >Mayor's Permit</option>
        <option value="First Time Job Seeker" >First Time Job Seeker</option>
        <option value="Job Requirement" >Job Requirement</option>
        <option value="others" >Others</option>
    </select>
    {#if selectedPurpose === "others"}
        <label for="#others">Please specify:</label>
        <input type="text" id="others" placeholder="Type Here" class="input input-ghost" required bind:value={others}>
    {/if}

    <section class="w-full flex flex-col lg:flex-row justify-around p-4 gap-2">
        <div class="flex lg:justify-start justify-center lg:gap-1">
            <button type="submit" class="btn btn-primary flex gap-2" disabled={!selectedPurpose}>
                <p>Next</p> 
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button type="reset" 
                class="btn btn-ghost hover:bg-neutral hover:underline hover:underline-offset-2" 
            >Reset</button>
        </div>
        <button type="button" 
            class="btn btn-neutral lg:p-2 btn-md lg:btn-md flex items-center gap-2 hover:bg-neutral group hover:border-none" 
            on:click={()=>dispatch("back")}
        >
            <i class="fa-solid fa-arrow-left"></i>
            <p class="group-hover:underline group-hover:underline-offset-2">Go Back</p>
        </button>

    </section>
</form>