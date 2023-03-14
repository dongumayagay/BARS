<script>
    /** @type {import('./$types').PageData} */
    import {currentPage} from "$lib/stores.js"
    import NavigationButtons from './NavigationButtons.svelte';
    import RequestMessages from '$lib/components/messaging-components/RequestMessages.svelte';
	import ImagePreview from './ImagePreview.svelte';
    import { zoom } from "$lib/zoom.js"
    import {goto} from "$app/navigation"
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

<div class="w-full p-4 lg:pl-10">
    <button class="btn btn-info btn-sm gap-2" on:click={()=> goto("../ticket-tracker")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        <p>Go Back</p>      
    </button>
</div>
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
                        {#if !!documentRequest.docPurpose}
                           <p class="font-semibold text-[14px]">Purpose of the Documents</p>
                           <p class="text-[14px]">- {documentRequest.docPurpose}</p>
                        {:else}
                            <p class="font-semibold text-[14px]">Purpose of the Documents</p>
                            {#each documentRequest.docsRequested??[] as requestedDocument}
                            <div class="flex flex-col items-center">
                                <p class="text-[14px] underline underline-offset-2">{requestedDocument.name}</p>
                                {#each requestedDocument.purposes??[] as purpose}
                                    <div class="flex justify-center items-center gap-2">
                                        <i class="fa-solid fa-circle text-[8px]"></i>
                                        <p class="text-[14px]">{(purpose.name === "others" ? purpose.others : purpose.name)}</p>
                                    </div>
                                {/each}
                            </div>
                            {/each}
                        {/if}
                    </div>
                </section>
                <div class="flex gap-2">
                    <small>Status:</small>
                    <small class:text-info={documentRequest.status=="pending"}>{documentRequest.status}</small>
                </div>
            </div>
        </section>
        {#if documentRequest.status !== "Request Completed"}
        <section class="w-[90vw] lg:w-[60vw] flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4" class:hidden={page !== 0}>
            <p class="font-semibold w-full text-center">Uploaded Requirements</p>
            {#each documentRequest.docsRequested as document}
                <div class="flex gap-2">
                    <p>For: </p>
                    <p class="font-semibold">{document.name}</p>
                </div>
                <div class="w-full flex justify-center gap-1 lg:gap-4">
                    <ImagePreview requestId={documentRequest.id} documentName={document.name} on:viewImage={(event)=>viewHandler(event)}/>
                </div>
            {/each}
            {#if !!documentRequest.authorizedRequestor}
            <div>
                <p class="font-semibold">Authorization Letter</p>
                <div class="w-full h-max flex justify-center gap-2">
                    <ImagePreview 
                        requestId={documentRequest.id}
                        documentName={"Authorization Letter"}
                        on:viewImage={viewHandler}
                    />
                </div>
            </div>
            {/if}
            {#if !!documentRequest.guardianInfo}
                <div>
                    <p class="font-semibold">Guardian/s' Valid ID's</p>
                    {#if documentRequest.guardianInfo.guardianship === "parents"}
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={documentRequest.id}
                                documentName={"Mother's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={documentRequest.id}
                                documentName={"Father's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                    {/if}
                    {#if documentRequest.guardianInfo.guardianship === "singleParent" && documentRequest.guardianInfo.parentsRelation === "mother"}
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={documentRequest.id}
                                documentName={"Mother's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                    {/if}
                    {#if documentRequest.guardianInfo.guardianship === "singleParent" && documentRequest.guardianInfo.parentsRelation === "father"}
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={documentRequest.id}
                                documentName={"Father's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                    {/if}
                    {#if documentRequest.guardianInfo.guardianship === "guardian"}
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={documentRequest.id}
                                documentName={"Guardian's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                    {/if}
                </div>
            {/if}
        </section>
        {/if}
        {#if enlargeImage}
            <div class="w-screen h-full fixed top-0 left-0 flex flex-col items-center justify-center bg-black/70 z-20">
                <div class="w-full flex justify-start">
                    <button class="btn btn-ghost hover:bg-transparent group" on:click={closeHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-neutral ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p class="text-neutral group-hover:underline">Close</p>
                    </button>
                </div>
                <div class="w-full h-full flex flex-col items-center justify-center gap-4 z-10">
                    <img src={imageToEnlarge.imageUrl} alt={imageToEnlarge.requirementName} class="w-[75vw] lg:w-max lg:h-[65vh] hover:cursor-zoom-in" use:zoom>
                    <p class="text-neutral text-lg underline">{imageToEnlarge.name}</p>
                </div>
            </div>  
        {/if}
    </section>
    <section class="w-full lg:w-[60vw] h-full flex lg:border-l-[1px] border-accent justify-center" class:hidden={page !== 1}>
        <RequestMessages requestId={documentRequest.id} {requesterFullName} status={documentRequest.status}/>
    </section>
</main>
