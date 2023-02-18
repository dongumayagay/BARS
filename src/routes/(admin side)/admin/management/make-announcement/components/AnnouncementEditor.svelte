<script>
    import { storage, db } from "$lib/firebase/client.js"
    import { createEventDispatcher } from "svelte";
    import { Timestamp } from "firebase/firestore";
	import AnnouncementPhotos from "./AnnouncementPhotos.svelte";
    import { getDownloadURL, listAll, ref } from "firebase/storage";
    import { zoom } from "$lib/zoom.js"

    export let announcement;

    const dispatch = createEventDispatcher();
    const originalAnnouncementDetail = {...announcement};

    let enlargeImage;
    let imageToEnlarge = {};
    let filePaths = [];
    let filePathsDeleted = [];
    let filesToUpload = [];

    // function closeHandler(){
    //     dispatch("close");
    // }
    function viewHandler(url){
        imageToEnlarge.imageUrl = url
        imageToEnlarge.name = url; 
        enlargeImage = true;
    }

    function closeImageHandler(){
        imageToEnlarge = {};
        enlargeImage = false;
    }

    async function uploadedPhotosFetcher(){
        filePaths = [];
        listAll(ref(storage, "announcementFiles/" + announcement.id))
        .then((files)=>{
            files.items.forEach((file)=>{
                filePaths = [...filePaths, file.fullPath]
            })
        })
        .catch((error)=>{
            alert(error.message)
        })
    }
    async function getUrl(fullPath){
        const fileRef = ref(storage, fullPath)
        const url = await getDownloadURL(fileRef)
        // console.log(url)
        return url;
    }
    uploadedPhotosFetcher();


    function changeHandler(file){
        for (let index = 0; index < file.length; index++) {
            const result = filesToUpload.find((item)=> item.file.name === file[index].name)
            if(result){
                result.file = file[index];
            } else {
                filesToUpload = [...filesToUpload, {file: file[index]}]
            }
        }
    }

    function deleteUploadedImage(index){
        filePathsDeleted = [...filePathsDeleted, {
            filePath: filePaths.find((element, elementIndex)=> elementIndex === index),
            filePathIndex: index
        }]
        filePaths = filePaths.filter((element, elementIndex)=> elementIndex !== index)
    }

    function deleteImagesToBeUploaded(index){
        filesToUpload = filesToUpload.filter((element, elementIndex) => elementIndex !== index)
    }

    function undoHandler(){
        filesToUpload = [];
        filePathsDeleted.forEach((item, index)=>{
            // filePaths.splice(item.filePathIndex + index, 0, item.filePath);
            filePaths = [...filePaths, item.filePath]
            console.log(filePaths)
        })
        filePathsDeleted = [];
        announcement = originalAnnouncementDetail;
        console.log(announcement)
    }

    function updateDispatcher(){
        // console.log(announcement)
        // console.log(filePathsDeleted)
        // console.log(filesToUpload)
        dispatch("update",{
            announcement: announcement,
            filePathsDeleted: filePathsDeleted,
            filesToUpload: filesToUpload
        })
    }

    $: console.log(filePathsDeleted)
    $: console.log(filesToUpload)
    $: console.log(filePaths)
</script>

<form class="w-full h-max flex flex-col gap-2" on:submit|preventDefault={updateDispatcher}>
    <section>
        <button type="button" on:click={()=>dispatch("cancel")}>
            <p>Cancel</p>
         </button>
        <button type="button">Delete Announcement</button>
    </section>
    <section class="bg-neutral w-full lg:w-full p-4 flex flex-col justify-start rounded-xl shadow-lg gap-2">
        <div class="w-full pb-4 flex flex-col border-b-[2px] border-base-100">
            <p class="text-xs lg:text-sm">{new Timestamp(announcement.datePosted.seconds, announcement.datePosted.nanoseconds).toDate()}</p>
            <p class="text-xs lg:text-sm">Posted by: {announcement?.postedBy??[]}</p>
        </div>
        <input type="text"  placeholder="Type your title here"  class="input input-ghost w-full text-center font-bold text-xl focus:bg-inherit placeholder:text-center placeholder:text-inherit placeholder:opacity-70"  bind:value={announcement.title} required />
        <textarea class="textarea textarea-ghost w-full focus:bg-inherit placeholder:text-inherit placeholder:opacity-70"  rows="5" placeholder="Type here" bind:value={announcement.content} required></textarea>
        <div class="h-max flex flex-wrap gap-5">
            {#each filePaths as fullpath, index}
            <div class="min-w-[150px] w-max relative ">
                {#await getUrl(fullpath)}
                    <p>Loading...</p>
                {:then url} 
                    <div class="min-w-[150px] w-full flex justify-center group relative">
                        <img src={url} alt={url} class="w-max h-[150px]">
                        <button type="button" class="opacity-0 bg-black/50 min-w-[150px] w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-[150px]" on:click={()=>viewHandler(url)}>
                            <p class="text-neutral">Click to view</p>
                        </button>
                    </div>
                {/await}
                <button type="button" class="absolute -top-5 -right-5" on:click={()=>deleteUploadedImage(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 hover:scale-110 text-error">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>  
            </div>
            {/each}
            {#each filesToUpload as savedFile, index}
            <div class="min-w-[150px] w-max relative ">
                <div class="min-w-[150px] w-full flex justify-center group relative">
                    <img src={URL.createObjectURL(savedFile.file)} alt={savedFile.file.name} class="w-max h-[150px]">
                    <button type="button" class="opacity-0 bg-black/50 min-w-[150px] w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-[150px]" on:click={()=>dispatch("viewImage", {url: URL.createObjectURL(savedFile.file), alt: savedFile.file.name})}>
                        <p class="text-neutral">Click to view</p>
                    </button>
                </div>
                <button type="button" class="absolute -top-5 -right-5" on:click={()=>deleteImagesToBeUploaded(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 hover:scale-110 text-error">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>  
            </div>
            {/each}
            <button type="button" class="w-[150px] h-[150px] bg-base-200 flex flex-col items-center justify-center gap-2 relative">
                <input title="Add Photos" type="file" class="opacity-0 absolute w-full h-full cursor-pointer" accept=".jpg, .jpeg, .png, .gif" multiple on:change={(event)=>changeHandler(event.target.files)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5  text-inherit">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <p class="text-inherit">Add Photo</p>
            </button>
        </div>
    </section>
    <section>
        <div>
            <button type="button" on:click={undoHandler}>
                <p>Undo Changes</p>
            </button>
            <button type="submit">
                <p>Save</p>
            </button>
        </div>
    </section>
</form>
{#if enlargeImage}
    <div class="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-center bg-black/70 z-20">
        <div class="w-full flex justify-start">
            <button class="btn btn-ghost hover:bg-transparent group" on:click={closeImageHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p class="group-hover:underline text-white">Close</p>
            </button>
        </div>
        <div class="flex flex-col items-center gap-4 z-10">
            <img src={imageToEnlarge.imageUrl} alt={imageToEnlarge.requirementName} class="w-[70vw] lg:w-max lg:h-[70vh] hover:cursor-zoom-in" use:zoom={1.1}>
        </div>
    </div>
{/if}