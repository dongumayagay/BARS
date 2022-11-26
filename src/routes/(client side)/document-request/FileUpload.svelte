<script>
    import {createEventDispatcher} from "svelte";
	import { construct_svelte_component } from "svelte/internal";
    
    const dispatch = createEventDispatcher();

    export let doclistReq;

    let filesToUpload = []

    function submitHandler() {
        // dispatch("next", {
        //     documentsRequestList
        // })
        console.log(filesToUpload)
    }

    function changeHandler(file, name) {
        console.log(file, name)
        const result = filesToUpload.find((item)=>item.name === name)
        if(result){
            result.file = file;
        } else {
            filesToUpload = [...filesToUpload, {name, file}]
        }
    }
    $: console.log(filesToUpload)
</script>

<form class="flex flex-col items-center justify-center" on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()}>
    <p>Please submit the following requirements</p>
    <div class="flex flex-col gap-3 ">
        <button type="reset" on:click={()=>{filesToUpload = []; dispatch("back")}}>Back</button>
        <!-- {#if doclistReq} -->
            {#each doclistReq as document}
            <div class="pb-2 border-b-4 border-primary">
                <div>
                    <p class=" font-semibold">{document.name}</p>
                </div>
                <div class="flex flex-col gap-4">
                    {#each document.requirements as requirement}
                    <div class="w-[50vw] flex flex-col items-center gao-2">
                        <h1>
                            {JSON.stringify(document)}
                        </h1>
                        <p>{requirement.requirement}</p>
                        <input required type="file" 
                        on:change={(event)=>changeHandler(event.target.value, document.id + "-" + document.name+ "-" + requirement.requirement)}
                            accept=".jpg, .jpeg .png, .svg, .webp" 
                            name="file" 
                            class="file-input file-input-bordered file-input-primary w-full max-w-xs" 
                        />
                    </div>
                    {/each}
                </div>
            </div>
            {/each}
        <!-- {/if} -->
    </div>

    <button type="submit">Next</button>
    <button type="reset">Clear Form</button>

</form>

