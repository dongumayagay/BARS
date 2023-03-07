<script>
	import { Timestamp } from "firebase/firestore";
    import AnnouncementPhotos from "./AnnouncementPhotos.svelte";
	import ImagesViewer from "./ImagesViewer.svelte";
    
    export let announcements;

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
</script>


{#each announcements as announcement}
    <section class="bg-neutral w-full lg:w-full p-4 flex flex-col rounded-xl shadow-lg relative">
        <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center overflow-hidden">
            <img src="/brgyLogo.png" alt="brgyLogo" class="w-[75%] lg:w-[50%] opacity-20">
        </div>
        <div class="w-full pb-4 flex flex-col border-b-[2px] border-base-100">
            <p class="text-xs lg:text-sm">{new Timestamp(announcement.datePosted.seconds, announcement.datePosted.nanoseconds).toDate()}</p>
            <p class="text-xs lg:text-sm">Posted by: {announcement?.postedBy??[]}</p>
        </div>
        <p class="w-full text-center p-4 font-bold text-xl lg:text-2xl">{announcement?.title??[]}</p>
        <p class="w-full min-h-[150px] text-sm lg:text-md whitespace-pre-wrap">{announcement?.content??[]}</p>
        {#if announcement.hasFiles}
            <AnnouncementPhotos announcementId={announcement.announcementId} on:viewImage={(event)=>viewHandler(event)}/>
        {/if}
    </section>
{/each}
{#if enlargeImages}
    <ImagesViewer {filePaths} {imageIndex} on:close={closeHandler}/>
{/if}