<script>
	import { Timestamp } from "firebase/firestore";
	import AnnouncementPhotos from "./AnnouncementPhotos.svelte";
    import { zoom } from "$lib/zoom.js"
    import { createEventDispatcher } from "svelte";
	import ImagesViewer from "./ImagesViewer.svelte";
    
    export let announcements;

    const dispatch = createEventDispatcher()

    let enlargeImages = false;
    let filePaths = [];
    let imageIndex;

    function viewHandler(event){
        enlargeImages = true;
        filePaths = [...event.detail.filePaths]
        imageIndex = event.detail.index
        console.log(event.detail)
    }

    function closeHandler(){
        filePaths = [];
        enlargeImages = false;
    }

    $: console.log(announcements)
</script>

<div class="w-full h-full flex flex-col gap-2">
    <p>Your posts:</p>
    <section class="overflow-y-auto w-full max-h-[500px] flex flex-col p-4 gap-6">
        {#each announcements as announcement}
            <div class="bg-neutral w-full lg:w-full p-4 flex flex-col justify-start rounded-xl shadow-lg relative">
                <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden z-10">
                    <img src="/brgyLogo.png" alt="brgyLogo" class="w-[75%] lg:w-[50%] opacity-20">
                </div>
                <div class="w-full flex justify-between z-20">
                    <div class="w-full pb-4 flex flex-col border-b-[2px] border-base-100">
                        <p class="text-xs lg:text-sm">{new Timestamp(announcement.datePosted.seconds, announcement.datePosted.nanoseconds).toDate()}</p>
                        <p class="text-xs lg:text-sm">Posted by: {announcement?.postedBy??[]}</p>
                    </div>
                    <button class="h-max hover:scale-110 transition-transform duration-100" on:click={()=>dispatch("edit", announcement)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                </div>
                <p class="w-full text-center p-4 font-bold text-xl lg:text-2xl">{announcement?.title??[]}</p>
                <p class="w-full min-h-[150px] text-sm lg:text-md whitespace-pre-wrap">{announcement?.content??[]}</p>
                {#if announcement.hasFiles}
                    <AnnouncementPhotos id={announcement.id} on:viewImage={viewHandler}/>
                {/if}
            </div>
        {/each}
    </section>
    {#if enlargeImages}
        <ImagesViewer {filePaths} {imageIndex} on:close={closeHandler}/>
    {/if}
</div>