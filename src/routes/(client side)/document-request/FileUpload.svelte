<script>
    import {createEventDispatcher} from "svelte";
    
    const dispatch = createEventDispatcher();

    export let listOfRequestedDocuments;

    let filesToUpload = []

    function submitHandler() {
        dispatch("next", {
            filesToUpload
        })
    }

    function changeHandler(file, requestedDocumentName, requirementName) {
        const result = filesToUpload.find((item)=>item.requestedDocumentName === requestedDocumentName && item.requirementName === requirementName)
        console.log(result)
        if(result){
            result.file = file;
        } else {
            filesToUpload = [...filesToUpload, {requestedDocumentName, file, requirementName}]
        }
    }
</script>

<form class="w-full flex flex-col items-center justify-center" on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()}>
    <div class="w-full flex justify-start">
        
    </div>
    <p class="text-center font-semibold">Please submit the following requirements</p>
    <div class="flex flex-col gap-3 ">
            {#each listOfRequestedDocuments as document}
            <div class="pb-5 border-b-4 border-dotted border-secondary">
                <div class="p-3">
                    <p class=" font-medium">{document.name}</p>
                </div>
                <div class="flex flex-col items-center gap-4">
                    {#each document.requirements as requirement}
                    <div class="w-[85%] lg:w-[30vw] flex flex-col items-center gap-2">
                        <p>{requirement}</p>
                        <input required type="file" 
                        on:change={(event)=>changeHandler(event.target.files, document.name, requirement)}
                            accept=".jpg, .jpeg, .png" 
                            name="file" 
                            class="file-input file-input-bordered file-input-primary w-full max-w-xs file:w-[40%]" 
                        />
                    </div>
                    {/each}
                </div>
            </div>
            {/each}
    </div>

    <section class="w-full flex flex-col lg:flex-row justify-around p-4 gap-2">
        <div class="flex lg:justify-start justify-center lg:gap-1">
            <button type="submit" class="btn btn-primary flex gap-2">
                <p>Next</p> 
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button type="reset" 
                class="btn btn-ghost hover:bg-neutral hover:underline hover:underline-offset-2" 
            >Reset Files</button>
        </div>
        <button type="button" 
            class="btn btn-neutral lg:p-2 btn-md lg:btn-md flex items-center gap-2 hover:bg-neutral group hover:border-none" 
            on:click={()=> {filesToUpload = []; dispatch("back")}}
        >
            <i class="fa-solid fa-arrow-left"></i>
            <p class="group-hover:underline group-hover:underline-offset-2">Go Back</p>
        </button>

    </section>

</form>
