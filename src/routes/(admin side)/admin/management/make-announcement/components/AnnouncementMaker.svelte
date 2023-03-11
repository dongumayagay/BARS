<script>
    import {userStore} from "$lib/stores.js";
    import {zoom} from "$lib/zoom.js"
    import { db, storage } from "$lib/firebase/client.js";
	import { addDoc, collection, Timestamp } from "firebase/firestore";
	import { uploadBytes, ref } from "firebase/storage";
    import { createEventDispatcher } from "svelte";
    import { Circle } from "svelte-loading-spinners";
	import AnnouncementPreviewForm from "./AnnouncementPreviewForm.svelte";

    export let page;
    
    const dispatch = createEventDispatcher();

    let showUploadingModal = false;

    async function submitHandler(event){
        try {
            let hasFiles = false;

            showUploadingModal = true
            if(event.detail.filesToUpload.length > 0) hasFiles = true;
           
            const announcementUploadRef = await addDoc(collection(db, "announcements"),{
                title: event.detail.announcementTitle,
                content: event.detail.announcementContent,
                datePosted: Timestamp.now(),
                postedBy: (!!$userStore.displayName ? $userStore.displayName : $userStore.email),
                email: $userStore.email,
                hasFiles,
            })

            if(hasFiles){ 
                const fileUploadPromises = event.detail.filesToUpload.map((value)=>{
                    const pathName = "announcementFiles/" + announcementUploadRef.id + "/" + value.file.name;
                    const storageReference =  ref(storage, pathName);

                    return uploadBytes(storageReference, value.file);
                })
                const fileUploadPromisesResult = await Promise.all(fileUploadPromises);
                console.log(announcementUploadRef, fileUploadPromisesResult)
                if(!!announcementUploadRef && !!fileUploadPromisesResult){
                    showUploadingModal = false;
                    dispatch("close")
                }
            } else {
                if(!!announcementUploadRef){
                    showUploadingModal = false;
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

{#if page === 1}
<div class="overflow-y-auto flex flex-col gap-2">
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
    {#if showUploadingModal}
        <section class="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center z-20">
            <div class="w-[50vw] h-[50vh] bg-neutral flex flex-col justify-center items-center rounded-xl shadow-lg">
                <Circle/>
                <p class="w-full font-bold text-center">Uploading announcement. Please wait...</p>
            </div>
        </section>
    {/if}
</div>
{/if}