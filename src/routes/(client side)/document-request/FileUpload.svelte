<script>
    import {createEventDispatcher} from "svelte";
    
    const dispatch = createEventDispatcher();

    export let listOfRequestedDocuments, isRequestForSomeone;

    let filesToUpload = [];
    let nodes = [];

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

    $: if(nodes) {
        try{
            for(let documentIndex = 0; documentIndex < listOfRequestedDocuments.length; documentIndex++){
                for(let requirementIndex = 0; requirementIndex < listOfRequestedDocuments[documentIndex].requirements.length; requirementIndex++){
                    let requirementElement = listOfRequestedDocuments[documentIndex].requirements[requirementIndex];
                    let nodeElement = nodes[documentIndex + (documentIndex + requirementIndex)]
                    if(requirementElement.isRequired){
                        nodeElement.setAttribute("required", "")
                    }
                }
            }    
        } catch(error) {
            if(error.message !== "Cannot read properties of undefined (reading 'setAttribute')"){
                alert(error.message)

            }
        }
    }

    // $: console.log(nodes)
</script>

<form class="w-full flex flex-col items-center justify-center" on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()}>
    <div class="w-full flex justify-start">
        
    </div>
    <p class="text-center font-semibold">Please submit the following requirements</p>
    <div class="flex flex-col gap-3 ">
            {#each listOfRequestedDocuments as document, documentIndex}
            <div class="pb-5 border-b-4 border-dotted border-secondary">
                <div class="p-3">
                    <p class=" font-medium">{document.name}</p>
                </div>
                <div class="flex flex-col items-center gap-4">
                    {#each document.requirements as requirement, requirementIndex}
                    <div class="w-[85%] lg:w-[30vw] flex flex-col items-center gap-2">
                        <p>{requirement.name}</p>
                        <input type="file" 
                        bind:this={nodes[documentIndex + (documentIndex + requirementIndex)]}
                        on:change={(event)=>changeHandler(event.target.files, document.name, requirement.name)}
                            accept=".jpg, .jpeg, .png" 
                            name="file" 
                            class="file-input file-input-bordered file-input-primary w-full max-w-xs file:w-[40%] peer" 
                        />
                        <small class="w-full hidden text-error peer-required:block">This field is required</small>
                    </div>
                    {/each}
                </div>
            </div>
            {/each}
            <!-- <div class="pb-5 border-b-4 border-dotted border-secondary">
                <div class="p-3">
                    <p class=" font-medium">{document.name}</p>
                </div>
                <div class="flex flex-col items-center gap-4">
                    {#each document.requirements as requirement, requirementIndex} -->
                    {#if isRequestForSomeone}
                        <div class="w-[85%] lg:w-[30vw] flex flex-col items-center gap-2">
                            <p>Authorization Letter</p>
                            <!-- bind:this={nodes[nodes.length + 1]} -->
                            <input type="file" 
                            on:change={(event)=>changeHandler(event.target.files, "Authorization Letter", event.target.files[0].name.split(".")[0])}
                                accept=".jpg, .jpeg, .png" 
                                name="file"
                                required 
                                class="file-input file-input-bordered file-input-primary w-full max-w-xs file:w-[40%] peer" 
                            />
                            <small class="w-full hidden text-error peer-required:block">This field is required</small>
                        </div>
                    {/if}
                    <!-- {/each}
                </div>
            </div> -->
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
