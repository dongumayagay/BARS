<script>
	import { Timestamp } from "firebase/firestore";
	import AnnouncementPhotos from "./AnnouncementPhotos.svelte";
    import { zoom } from "$lib/zoom.js"
    
    export let announcements;

    let enlargeImage = false;
    let imageToEnlarge = {};

    function viewHandler(event){
        enlargeImage = true;
        imageToEnlarge.imageUrl = event.detail.url
        imageToEnlarge.name = event.detail.alt; 
    }

    function closeHandler(){
        imageToEnlarge = {};
        enlargeImage = false;
    }
</script>

<div class="w-full flex flex-col gap-2">
    <p>Your posts:</p>
    {#each announcements as announcement}
        <section class="bg-base-100 w-full lg:w-full p-4 flex flex-col rounded-xl shadow-lg">
            <div class="w-full pb-4 flex flex-col border-b-[2px] border-neutral">
                <p class="text-xs lg:text-sm">{new Timestamp(announcement.datePosted.seconds, announcement.datePosted.nanoseconds).toDate()}</p>
                <p class="text-xs lg:text-sm">Posted by: {announcement?.postedBy??[]}</p>
            </div>
            <p class="w-full text-center p-4 font-bold text-xl lg:text-2xl">{announcement?.title??[]}</p>
            <p class="w-full min-h-[150px] text-sm lg:text-md whitespace-pre-wrap">{announcement?.content??[]}</p>
            {#if announcement.hasFiles}
                <AnnouncementPhotos announcementId={announcement.id} on:viewImage={(event)=>viewHandler(event)}/>
            {/if}
        </section>
    {/each}
    {#if enlargeImage}
        <div class="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-black/70 z-20">
            <div class="w-full flex justify-start">
                <button class="btn btn-ghost hover:bg-transparent group" on:click={closeHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-neutral ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p class="text-neutral group-hover:underline">Close</p>
                </button>
            </div>
            <div class="flex flex-col items-center gap-4 z-10">
                <img src={imageToEnlarge.imageUrl} alt={imageToEnlarge.requirementName} class="w-[70vw] lg:h-[70vh] hover:cursor-zoom-in" use:zoom={1.1}>
                <p class="text-neutral text-lg underline">{imageToEnlarge.name}</p>
            </div>
        </div>
    {/if}
</div>