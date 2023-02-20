<script>
    import {createEventDispatcher} from "svelte"
    import { storage } from "$lib/firebase/client.js"
    import { ref, getDownloadURL, listAll } from "firebase/storage";

    export let requestId;
    export let documentName;

    const dispatch = createEventDispatcher();

    let requirementsList = [];

    listAll(ref(storage, "documentRequestsFiles/" + requestId + "/" + documentName + "/"))
    .then((requirements)=>{
        requirements.items.forEach((requirement)=>{
            requirementsList = [...requirementsList, {
                name: requirement.name.split(".")[0],
                filePath: requirement.fullPath
            }]
        })
    })

    async function fetchURLHandler(filePath){
        try {
            const url =  await getDownloadURL(ref(storage, filePath))
            return url;
        } catch (error) {
            alert(error.message)
        }
    }
</script>

<!-- {#await fetchURLHandler()}
    <div class="w-[150px] h-[150px] flex flex-col items-center justify-center">
        <img src="/loading.png" alt="loader" class="h-[20%]">
        <small>Loading image..</small>
    </div>
{:then url} 
<div class="w-fit group relative">
    <div class="min-w-[150px] flex justify-center items-center">
        <img src={url} alt={requirementName} class="h-[150px]">
    </div>
    <button class="opacity-0 bg-black/50 w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-[150px]" on:click={()=>dispatch("viewImage", {url, name})}>
        <p class="text-neutral">Click to view</p>
    </button>
    <p class="w-full text-center">{requirementName}</p>
</div>
{:catch error}
    <p>{error}</p>
{/await} -->
{#if requirementsList.length > 0}
    {#each requirementsList as requirement}
        {#await fetchURLHandler(requirement.filePath)}
            <div class="w-[150px] h-[150px] flex flex-col items-center justify-center">
                <img src="/loading.png" alt="loader" class="h-[20%]">
                <small>Loading image..</small>
            </div>
        {:then url} 
            <div class="w-fit group relative">
                <div class="min-w-[150px] flex justify-center items-center">
                    <img src={url} alt={requirement.name} class="h-[150px]">
                </div>
                <button class="opacity-0 bg-black/50 w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-[150px]" on:click={()=>dispatch("viewImage", {url, requirementName: requirement.name})}>
                    <p class="text-neutral">Click to view</p>
                </button>
                <p class="w-full text-center">{requirement.name}</p>
            </div>
        {:catch error}
            <p>{error}</p>
        {/await}
    {/each}
{:else}
    <p class="p-4">No Uploaded {documentName} requirements</p>
{/if}