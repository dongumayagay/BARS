<script>
    import {userStore} from "$lib/stores.js";
    import {zoom} from "$lib/zoom.js"
    import { db, storage } from "$lib/firebase/client.js";
	import { addDoc, collection, Timestamp } from "firebase/firestore";
	import { uploadBytes, ref } from "firebase/storage";
    import { createEventDispatcher } from "svelte";
	import AnnouncementPreviewForm from "./AnnouncementPreviewForm.svelte";

    export let page;
    
    const dispatch = createEventDispatcher();

    let showModal = false;

    async function submitHandler(event){
        try {
            let hasFiles = false;
            let filePaths = []; 
            
            if(event.detail.filesToUpload.length > 0) hasFiles = true;

            console.log(hasFiles);
            
            const announcementUploadRef = await addDoc(collection(db, "announcements"),{
                title: event.detail.announcementTitle,
                content: event.detail.announcementContent,
                datePosted: Timestamp.now(),
                postedBy: $userStore.email,
                hasFiles,
                
            })
            
            let fileUploadPromises;
            if(hasFiles){ 
                fileUploadPromises = event.detail.filesToUpload.map((value)=>{
                    const pathName = "announcementFiles/" + announcementUploadRef.id + "/" + value.file[0].name;
                    const storageReference =  ref(storage, pathName);

                    return uploadBytes(storageReference, value.file[0]);
                })
                const fileUploadPromisesResult = await Promise.all(fileUploadPromises);
                console.log(announcementUploadRef, fileUploadPromisesResult)
                if(!!announcementUploadRef && !!fileUploadPromises){
                    dispatch("close")
                }
            } else {
                if(!!announcementUploadRef){
                    dispatch("close")
                }
            }

        } catch (error) {
            alert(error.message)
        }
    }

    function closeHandler(){
        dispatch("close");
    }

    let enlargeImage = false;
    let imageToEnlarge = {};

    function viewHandler(event){
        imageToEnlarge.imageUrl = event.detail.url
        imageToEnlarge.name = event.detail.alt; 
        enlargeImage = true;
    }

    function closeImageHandler(){
        imageToEnlarge = {};
        enlargeImage = false;
    }
</script>


<div class="flex flex-col gap-2" class:hidden={page !== 1}>
    <button class="w-max btn btn-ghost flex gap-1 hover:bg-transparent group" on:click={()=>closeHandler()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
       <p class="group-hover:underline">Go Back</p>
    </button>
    <p class="w-full text-center text-lg font-semibold">Preview</p>
    <AnnouncementPreviewForm on:viewImage={(event) => viewHandler(event)} on:submit={(event) => submitHandler(event)}/>
    {#if enlargeImage}
        <div class="w-screen h-screen fixed top-0 left-0 flex flex-col items-center gap-4 justify-center bg-black/70 z-20">
            <div class="w-full flex justify-start">
                <button class="btn btn-ghost hover:bg-transparent group" on:click={closeImageHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-neutral ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p class="text-neutral group-hover:underline">Close</p>
                </button>
            </div>
            <div class="flex flex-col items-center gap-4 z-10">
                <img src={imageToEnlarge.imageUrl} alt={imageToEnlarge.requirementName} class="w-[70vw] lg:w-max lg:h-[70vh] hover:cursor-zoom-in" use:zoom={1.1}>
                <p class="text-neutral text-lg underline">{imageToEnlarge.name}</p>
            </div>
        </div>
    {/if}
</div>