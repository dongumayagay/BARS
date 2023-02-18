<script>
    import { createEventDispatcher } from "svelte";
    import { storage } from "$lib/firebase/client.js"
    import { getDownloadURL, ref } from "firebase/storage";
    import { goto } from "$app/navigation"
    import { zoom } from "$lib/zoom.js";
    import { swipe } from "svelte-gestures"

    export let filePaths;
    export let imageIndex;

    const dispatch = createEventDispatcher();

    // let imageIndex = imageStartingIndex;

    // goto("#slide" + imageIndex)
   

    async function getUrl(fullPath){
        const fileRef = ref(storage, fullPath)
        const url = await getDownloadURL(fileRef);

        return url;
    }

    function slideHandler(direction){
        const maxIndex = filePaths.length - 1;

        if(direction === "left"){
            if(imageIndex === 0) {imageIndex = maxIndex}
            else {imageIndex = imageIndex - 1}
        }else if(direction === "right"){
            if(imageIndex === maxIndex)
            {imageIndex = 0}
            else {imageIndex = imageIndex + 1}
        }
        console.log(imageIndex)
        goto("#slide" + imageIndex )
    }

    function swipeHandler(event){
        if(event.detail.direction === "left"){
            slideHandler("right")
        } else {
            slideHandler("left")
        }
    }

    slideHandler()

    $: console.log(filePaths)
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-black/70 z-20" on:click={()=>dispatch("close")}>
    <div class="w-full flex justify-start">
        <button class="btn btn-ghost hover:bg-transparent group" on:click={()=>dispatch("close")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p class="text-white group-hover:underline">Close</p>
        </button>
    </div>
    <div class="h-[5%] w-full flex justify-center">
        <p class="text-white text-md lg:text-lg">Photo # {imageIndex + 1} / {filePaths.length}</p>
    </div>
    <div class="carousel flex items-center justify-start gap-4 w-full" on:click|stopPropagation={()=>{}}>
        <div class="absolute px-[3%] w-full flex justify-between z-20">
            <button class="hidden btn btn-circle btn-primary md:block z-20" disabled={filePaths.length === 1} on:click={()=>slideHandler("left")}>❮</button> 
            <button class="hidden btn btn-circle btn-primary md:block z-20" disabled={filePaths.length === 1} on:click={()=>slideHandler("right")}>❯</button>
        </div>
        {#each filePaths as filePath, index}
        {#await getUrl(filePath)}
            <p>Loading...</p>
        {:then url} 
        <div class="w-full h-screen flex items-center justify-center p-4">
            <div id={"slide" + index} class="carousel-item flex justify-center relative w-screen max-h-[80%] z-1" use:swipe={{ timeframe: 1000, minSwipeDistance: 100, touchAction: 'pan-y' }} on:swipe={swipeHandler}>
                <img src={url} alt={url} class="w-max max-w-[80%]" use:zoom={1.1} />
            </div> 
        </div>
            
        {/await}
        {/each}
    </div>
</div>

<!-- <div class="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-start bg-black/70 z-20" on:click={()=>dispatch("close")}>
    <div class="w-full h-[15%] flex justify-start p-2">
        <button class="btn btn-ghost hover:bg-transparent group" on:click={()=>dispatch("close")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p class="text-white group-hover:underline">Close</p>
        </button>
    </div>
    <div class="h-[5%] w-full flex justify-center">
        <p class="text-white text-md lg:text-lg">Photo # {imageIndex + 1} / {filePaths.length}</p>
    </div>
    <div class="w-full h-full flex items-center justify-center relative">
        <div class="fixed top-[52%] lg:top-[50%] px-[3%] w-full flex justify-between z-20">
            <button class="btn btn-circle btn-primary z-20" disabled={filePaths.length === 1} on:click|stopPropagation={()=>slideHandler("left")}>❮</button> 
            <button class="btn btn-circle btn-primary z-20" disabled={filePaths.length === 1} on:click|stopPropagation={()=>slideHandler("right")}>❯</button>
        </div>
        {#each filePaths as filePath, index}
        {#await getUrl(filePath)}
            <p class:hidden={index!==imageIndex}>Loading...</p>
        {:then url} 
        <div class="w-[80%] h-full absolute top-0 left-0 flex items-center justify-center p-4" class:hidden={index!==imageIndex}>
            <div id={"slide" + index} class="max-w-[80%] min-w-[50%] flex justify-center max-h-[80%] z-1" class:hidden={index!==imageIndex}>
                <img src={url} alt={url} class="w-full" use:zoom={1.1} on:click|stopPropagation={()=>{}}  use:swipe={{ timeframe: 1000, minSwipeDistance: 100, touchAction: 'pan-y' }} on:swipe={swipeHandler} />
            </div> 
        </div>
            
        {/await}
        {/each}
    </div>
</div> -->