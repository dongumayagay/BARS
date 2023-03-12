<script>
    import { createEventDispatcher } from "svelte";

    export let listOfRequestedDocuments;

    const dispatch = createEventDispatcher();

    let selectedPurpose = "";
    let others;
    let multiPurpose = false;
    // let purposesPerDocuments;

    function submitHandler(){
        if(!multiPurpose){
            if(selectedPurpose === "others") selectedPurpose = others;
            dispatch("next", { 
                selectedPurpose: (selectedPurpose === "others" ? others : selectedPurpose),
                multiPurpose,
            })
        } else {
            dispatch("next", {
                multiPurpose,
                listOfRequestedDocuments,
            })
        }
    }
    function removeHandler(documentIndex, purposeIndex){
        listOfRequestedDocuments[documentIndex].purposes = listOfRequestedDocuments[documentIndex].purposes.filter((item, itemIndex)=> itemIndex !== purposeIndex);
    }

    $: console.log(selectedPurpose)
    // $: purposesPerDocuments = listOfRequestedDocuments.forEach((item)=>({
    //     name: item.name,
    //     purposes: [],
    // }))
    // $: console.log(purposesPerDocuments)
</script>

<form class="w-full flex flex-col items-center gap-4" on:submit|preventDefault={submitHandler}>
    <div class="flex flex-col items-center gap-2 form-control">
        <label class="label cursor-pointer flex gap-2">
            <input type="checkbox" id="multiPurpose" class="checkbox checkbox-sm" bind:checked={multiPurpose}>
            <label for="#multiPurpose" class="label-text">Multiple Purposes</label>
        </label>
        <small class="label-text-alt text-info">Maximum of [3] purposes per document</small>
    </div>
    {#if !multiPurpose}
        <label for="#purpose" class="label-text">Select the purpose of your document</label>
        <div class="flex flex-col gap-2">
            <select id="purpose" class="select select-primary select-bordered bg-transparent" required bind:value={selectedPurpose}>
                <option value="" disabled selected>Select Purpose</option>
                <option value="ILSP Scholarship" >ILSP Scholarship</option>
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
                <div class="flex flex-col">
                    <label for="#others" class="label-text">Please specify:</label>
                    <div class="flex justify-center border-b-2">
                        <input type="text" id="others" placeholder="Type Here" class="input focus:outline-0 bg-transparent text-center" required bind:value={others}>
                    </div>
                </div>
            {/if}
        </div>
    {:else}
        {#each listOfRequestedDocuments??[] as requestedDocument, documentIndex}
            <p class="font-semibold">{requestedDocument.name}</p>
            <div class="w-full flex flex-col items-center gap-2">
                {#each requestedDocument.purposes??[] as purpose, purposeIndex}
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <select class="select select-primary select-bordered bg-transparent" required bind:value={purpose.name}>
                            <option value="" disabled selected>Select Purpose</option>
                            <option value="ILSP Scholarship" >ILSP Scholarship</option>
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
                        <button type="button" class="btn btn-ghost lg:hover:btn-error btn-sm w-max transition-all duration-200" on:click={()=>removeHandler(documentIndex, purposeIndex)} disabled={purposeIndex === 0}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                    {#if purpose.name === "others"}
                    <div class="flex flex-col">
                        <label for="#others" class="label-text">Please specify:</label>
                        <div class="flex justify-center border-b-2">
                            <input type="text" id="others" placeholder="Type Here" class="input focus:outline-0 bg-transparent text-center" required bind:value={purpose.others}>
                        </div>
                    </div>
                    {/if}
                </div>
                {/each}
                {#if requestedDocument.purposes.length < 3}
                    <button type="button" class="btn btn-ghost flex gap-2" on:click={()=>{requestedDocument.purposes[requestedDocument.purposes.length] = {name: "", others: ""}}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p>Add</p>
                    </button>
                {/if}
            </div>
        {/each}
    {/if}

    <section class="w-full flex flex-col lg:flex-row justify-around p-4 gap-2">
        <div class="flex lg:justify-start justify-center lg:gap-1">
            <button type="submit" class="btn btn-primary flex gap-2">
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