<script>
    /** @type {import('./$types').PageData} */
    import {currentPage} from "$lib/stores.js"
    import NavigationButtons from './NavigationButtons.svelte';
    import RequestMessages from '$lib/components/messaging-components/RequestMessages.svelte';
	import ImagePreview from './ImagePreview.svelte';
    import { zoom } from "$lib/zoom.js"
	import { onMount } from "svelte";
	import BasicInfoDisplay from "./BasicInfoDisplay.svelte";

    $currentPage = 3;

    export let data;

    const {documentRequest} = data;

    let enlargeImage = false;
    let imageToEnlarge = {};

    let page = 0;
    let requesterFullName = documentRequest.lastName + ", " + documentRequest.firstName + " " + documentRequest.middleName;

    console.log(documentRequest);

    function viewHandler(event){
        enlargeImage = true;
        imageToEnlarge.imageUrl = event.detail.url
        imageToEnlarge.name = event.detail.requirementName; 
    }

    function closeHandler(){
        imageToEnlarge = {};
        enlargeImage = false;
    }
</script>

<main class="p-4 w-full h-max flex flex-col lg:flex-row lg:items-start justify-center gap-4">
    <NavigationButtons {page} on:navigate={(event) => page = event.detail.index}/>
    <section class="flex flex-col gap-4">
        <section class="w-[90vw] lg:w-[60vw] flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4" class:hidden={page !== 0}>
            <div class="w-full flex justify-center items-center border-b-2 border-b-primary-focus border-dashed">
                <p class="w-max p-2 flex justify-center text-center rounded-xl font-semibold">ID: </p>
                <p class="font-semibold hover:underline">{documentRequest.id}</p>
            </div>
            <div class="flex flex-col gap-5">
                <div class="flex gap-2 items-center">
                    <p class="text-[14px]">Type of Request: </p>
                    <p class="text-[14px] font-semibold">Document Request</p>
                </div>
                <BasicInfoDisplay {documentRequest} />
                <section class="w-full flex flex-col items-center gap-2">
                    <div class="w-full text-sm flex flex-col items-center">
                        <p class="font-semibold">Documents Requested</p>
                        <div>
                            {#each documentRequest.docsRequested as document}
                                <div class="ml-5 flex items-center gap-2">
                                    <i class="fa-solid fa-circle text-[8px]"></i>
                                    <p>{document.name}</p>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="w-full flex flex-col items-center gap-2">
                           <p class="font-semibold text-[14px]">Purpose of the Documents</p>
                           <p class="text-[14px]">- {documentRequest.docPurpose}</p>
                       </div>
                </section>
                <div class="flex gap-2">
                    <small>Status:</small>
                    <small class:text-info={documentRequest.status=="pending"}>{documentRequest.status}</small>
                </div>
            </div>
        </section>
        <section class="w-[90vw] lg:w-[60vw] flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4" class:hidden={page !== 0}>
            <p class="font-semibold w-full text-center">Uploaded Requirements</p>
            {#each documentRequest.docsRequested as document}
                <p>{document.name}</p>
                <div class="w-full flex justify-center gap-1 lg:gap-4">
                    <ImagePreview requestId={documentRequest.id} documentName={document.name} on:viewImage={(event)=>viewHandler(event)}/>
                </div>
            {/each}
        </section>
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
                    <img src={imageToEnlarge.imageUrl} alt={imageToEnlarge.requirementName} class="w-[75vw] lg:w-max lg:h-[65vh] hover:cursor-zoom-in" use:zoom>
                    <p class="text-neutral text-lg underline">{imageToEnlarge.name}</p>
                </div>
            </div>  
        {/if}
    </section>
    <section class="w-full lg:w-[60vw] h-full flex justify-center" class:hidden={page !== 1}>
        <RequestMessages requestId={documentRequest.id} {requesterFullName}/>
    </section>
</main>
