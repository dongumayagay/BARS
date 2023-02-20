<script>
    import {createEventDispatcher} from "svelte"
    import { storage } from "$lib/firebase/client.js"
    import { ref, getDownloadURL } from "firebase/storage";

    export let requestId;
    export let documentName;
    export let requirementName;

    const dispatch = createEventDispatcher();

    async function fetchURLHandler(){
        try {
            const pathName = "documentRequestsFiles/" + requestId + "/" + documentName + "/" + requirementName + ".jpg"; 
            const fileRef = ref(storage, pathName);

            const url = await getDownloadURL(fileRef)
            return url;
        } catch (error) {
            console.log(error.message)
        }
    }
</script>

{#await fetchURLHandler()}
    <div class="w-[150px] h-[150px] flex flex-col items-center justify-center">
        <img src="/loading.png" alt="loader" class="h-[20%]">
        <small>Loading image..</small>
    </div>
{:then url} 
<div class="w-fit group relative">
    <div class="min-w-[150px] flex justify-center items-center">
        <img src={url} alt={requirementName} class="h-[150px]">
    </div>
    <button class="opacity-0 bg-black/50 w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-[150px]" on:click={()=>dispatch("viewImage", {url, requirementName})}>
        <p class="text-neutral">Click to view</p>
    </button>
    <p class="w-full text-center">{requirementName}</p>
</div>
{:catch error}
    <p>{error}</p>
{/await}