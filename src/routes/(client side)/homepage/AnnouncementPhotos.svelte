<script>
    import { storage } from "$lib/firebase/client.js";
    import { getDownloadURL, listAll, ref } from "firebase/storage";
    import { createEventDispatcher } from "svelte";
    
    export let announcementId;

    const dispatch = createEventDispatcher();

    let filePaths = [];

    function uploadedPhotosFetcher(){
        listAll(ref(storage, "announcementFiles/" + announcementId))
        .then((files)=>{
            files.items.forEach((file)=>{
                // const fileRef = getUrl()
                filePaths = [...filePaths, file.fullPath];
            })
        })
    }

    uploadedPhotosFetcher();

    async function getUrl(fullPath){
        const fileRef = ref(storage, fullPath)
        const url = await getDownloadURL(fileRef);

        return url;
    }

</script>

<div class="w-full flex flex-wrap justify-center items-center gap-1">
    {#each filePaths as fullPath, index}
        {#await getUrl(fullPath)}
            <p>Loading...</p>
        {:then url} 
        <div class="w-fit group relative">
            <img src={url} alt={"photo#" + index} class="w-[150px]">
            <button class="opacity-0 bg-black/50 w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-full" on:click={()=>dispatch("viewImage", {url, alt: "photo#" + (index + 1)})}>
                <p class="text-white">Click to view</p>
            </button>
        </div>
        {/await}
    {/each}
</div>