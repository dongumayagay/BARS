<script>
    import { createEventDispatcher,onMount } from "svelte";
    import { Circle } from 'svelte-loading-spinners';

    // export let showEditor;
    export let documentDetails;
    export let showLoadingScreen;
    
    const dispatch = createEventDispatcher();

    let editableDocumentDetails = {};
    // const {name, fee, requirements} = documentDetails??[];
    const documentDetailsContainer = {...documentDetails};
    
    function addRequirement(){
        editableDocumentDetails.requirements = [...editableDocumentDetails.requirements, {
            name: "",
            isRequired: false
        }] 
    }

    function resetDetails(){
        if(!!documentDetails){
            console.log(documentDetails, documentDetailsContainer, editableDocumentDetails)
            editableDocumentDetails = {...documentDetailsContainer};
        }else{
            editableDocumentDetails = {
                name: "",
                requirements: [
                    {name: "", isRequired: false}
                ],
                fee: 0
            };
        }
    }
    
    
    // documentDetailsContainer = {...documentDetail};
    if(!!documentDetails){
        Object.assign(editableDocumentDetails, documentDetailsContainer)
    } else {
        resetDetails();
    }

    function removeHandler(index){
        if( editableDocumentDetails.requirements.length > 1) {
            editableDocumentDetails.requirements = editableDocumentDetails.requirements.filter((requirement, requirementIndex) => requirementIndex !== index) 
        }
    }

    function deleteHandler(){
        dispatch("delete",{
            id: documentDetails.id
        })
    }

    function submitHandler(){
        let isUpdating;

        isUpdating = (!!documentDetails) ? true : false;
        console.log(isUpdating)

        if(!!documentDetails){
                console.log(isUpdating)
                dispatch("submit", {
                    editableDocumentDetails,
                    isUpdating
                })
        } else {
            console.log(isUpdating)
            dispatch("submit", {
                editableDocumentDetails,
                isUpdating,
            })
        }
        resetDetails();
    }
</script>

<!-- {#if (!!documentDetails)} -->
<section class="absolute top-0 left-0 overflow-y-auto w-full h-full flex justify-center bg-black/70 rounded-lg p-6">
    <form class="w-[70%] min-h-[70%] h-max bg-neutral flex flex-col p-6 rounded-xl shadow-lg relative gap-3" on:submit|preventDefault={submitHandler} >
        <div class="w-full flex justify-between items-center">
            <button type="button" class="btn btn-ghost flex gap-1" on:click={()=>dispatch("close")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p>{!!documentDetails ? "Close" : "Cancel"}</p>
            </button>
            <button type="button" class="btn btn-error gap-2" disabled={!documentDetails || (documentDetails.documentNo??"") === 3|| (documentDetails.documentNo??"") === 2 || (documentDetails.documentNo??"") === 1} on:click={deleteHandler}>
                <p>Remove</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
        </div>
        <div class="w-full flex flex-col gap-2">
            <p class="w-full text-center font-semibold">Document Name:</p>
            <input type="text" class="input input-bordered w-full text-center bg-neutral placeholder:opacity-75 focus:bg-neutral" placeholder="Document Name" required bind:value={editableDocumentDetails.name}>
        </div>
        <div class="w-full flex flex-col gap-2">
            <p class="w-full text-center font-semibold">Requirements:</p>
            {#each editableDocumentDetails.requirements as requirement, index}
            <div class="w-full flex flex-col gap-2">
                <div class="w-full h-max flex justify-between items-center gap-2">
                    <input type="text" class="input input-bordered bg-neutral w-full text-center placeholder:opacity-75" placeholder="Requirement Name" required bind:value={requirement.name}>
                    <div class="w-max flex items-center gap-2">
                        <input type="checkbox" class="checkbox checkbox-primary checkbox-xs" bind:checked={requirement.isRequired}>
                        <small class="w-max">Applicable to all</small>
                    </div>
                    <button type="button" class="btn btn-ghost hover:btn-error btn-sm w-max transition-all duration-200" on:click={()=>removeHandler(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
            {/each}
            <button type="button" class="btn btn-ghost flex gap-2" on:click={addRequirement}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p>Add</p>
            </button>
        </div>
        <div class="w-full flex flex-col gap-2" >
            <p class="font-semibold">Document Fee:</p>
            <div class="flex items-center gap-2 pl-4" >
                <p>₱</p>
                <input type="number" min="0" max="1500" class="input input-bordered w-max bg-neutral" bind:value={editableDocumentDetails.fee}>
            </div>
        </div>
        <div class="w-full flex justify-end gap-2">
            <!-- <button type="button" class="btn btn-ghost hover:btn-info flex gap-2" on:click={resetDetails}>
                <p>Revert Changes</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button> -->
            <button type="submit" class="btn btn-success flex gap-2">
                <p>Save</p>
                <i class="fa-solid fa-floppy-disk text-xl"></i>
            </button>
        </div>
        <div class="absolute top-0 left-0 w-full h-full bg-black/80 flex flex-col items-center justify-center gap-2 rounded-xl" class:hidden={!showLoadingScreen}>
            <Circle size="60" color="#6e6d6b" unit="px" duration="1s"/>
            <p>Updating documents list. Please wait....</p>
        </div>
    </form>
</section>
<!-- {/if} -->