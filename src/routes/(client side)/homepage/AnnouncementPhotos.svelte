<script>
    import { storage } from "$lib/firebase/client.js";
    import { getDownloadURL, listAll, ref } from "firebase/storage";
    import { createEventDispatcher } from "svelte";
    
    export let announcementId;

    const dispatch = createEventDispatcher();

    let filePaths = [];
    let urlList = [];

    function uploadedPhotosFetcher(){
        listAll(ref(storage, "announcementFiles/" + announcementId))
        .then((files)=>{
            files.items.forEach((file, index)=>{
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
            
            {#if index <= 2}
            <div class="w-[40vw] h-[40vw] lg:w-[150px] lg:h-[150px] flex items-center justify-center group relative rounded-xl ">
                <img src={url} alt={"photo#" + index} class="max-w-[40vw] max-h-[40vw] lg:max-w-[150px] lg:max-h-[150px] shadow-md">
                <button class="opacity-0 bg-black/50 w-full h-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 rounded-xl shadow-md" on:click={()=>dispatch("viewImage", {filePaths, index})}>
                    <p class="text-white">Click to view</p>
                </button>
            </div>
            {:else if index === 3}
            <div class="w-[40vw] h-[40vw] lg:w-[150px] lg:h-[150px] flex items-center justify-center group relative rounded-xl ">
                <img src={url} alt={"photo#" + index} class="max-w-[40vw] max-h-[40vw] lg:max-w-[150px] lg:max-h-[150px] shadow-md">
                {#if index === filePaths.length -1}
                <button class="opacity-0 bg-black/50 w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-full rounded-xl shadow-md" on:click={()=>dispatch("viewImage", {filePaths, index})}>
                    <p class="text-white">Click to view</p>
                </button>
                {:else if index < filePaths.length - 1}
                <button class="opacity-70 bg-black/50 w-full hover:opacity-100 transition-opacity ease-in-out duration-100 absolute top-0 h-full rounded-xl shadow-md" on:click={()=>dispatch("viewImage", {filePaths, index})}>
                    <p class="text-white text-lg">{"+" + (filePaths.length - 3)}</p>
                </button>
                {/if}
            </div>
            {/if}
        {/await}
    {/each}
</div>