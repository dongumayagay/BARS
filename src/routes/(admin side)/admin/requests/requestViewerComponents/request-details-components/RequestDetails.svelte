<script>
    import { createEventDispatcher } from "svelte";
    import { zoom } from "$lib/zoom.js"
    import RequestBasicInfo from "./RequestBasicInfo.svelte";
	import DocumentsRequested from "./DocumentsRequested.svelte";
	import SelectedDateAndOfficial from "./SelectedDateAndOfficial.svelte";
	import ImagePreview from "./ImagePreview.svelte";

    export let dataToView;

    const dispatch = createEventDispatcher();

    let enlargeImage = false;
    let imageToEnlarge = {};

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

<section class="w-full h-full flex flex-col items-center gap-4">
    <section class="w-full lg:w-[60vw] flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4">
        <div class="w-full flex justify-center items-center border-b-2 border-b-primary-focus border-dashed">
            <p class="w-max p-2 flex justify-center text-center rounded-xl font-semibold">ID: </p>
            <p class="font-semibold hover:underline">{dataToView.requestId}</p>
        </div>
        <div class="flex flex-col gap-5">
            <RequestBasicInfo {dataToView}/>
            <div class="text-sm flex flex-col ">
                {#if dataToView.typeOfRequest === "Document Request"}
                    <DocumentsRequested {dataToView} />
                {:else}
                    <SelectedDateAndOfficial appointmentDetails={{
                        appointmentDate: dataToView.appointmentDate??[],
                        appointmentTime: dataToView.appointmentTime??[],
                        selectedOfficial: dataToView.selectedOfficial??[],
                        appointmentPurpose: dataToView.appointmentPurpose??[]
                    }} />
                {/if}
                
            </div>
            <div class="flex gap-2">
                <small>Status:</small>
                <small 
                    class="font-semibold"
                    class:text-info={dataToView.status === "pending"}
                    class:text-success={dataToView.status === "Ready to claim" || dataToView.status === "Approved"}
                    class:text-error={dataToView.status === "Trashed"}
                >{dataToView.status}</small>
            </div>
        </div>
    </section>
    {#if dataToView.typeOfRequest === "Document Request" && dataToView.status !== "Request Completed"}
        <section class="w-[60vw] h-fit flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4">
            <p class="font-semibold w-full text-center">Uploaded Requirements</p>
            {#each dataToView?.docsRequested??[] as documentRequested}
            <div class="flex flex-col gap-2">
                <div class="flex gap-2">
                    <p>For: </p>
                    <p class="font-semibold">{documentRequested.name}</p>
                </div>
                <div class="w-full h-max flex justify-center gap-2">
                    <ImagePreview 
                        requestId={dataToView.requestId}
                        documentName={documentRequested.name}
                        on:viewImage={viewHandler}
                    />
                </div>
            </div>
            {/each}
            {#if !!dataToView.authorizedRequestor}
            <div>
                <p class="font-semibold">Authorization Letter</p>
                <div class="w-full h-max flex justify-center gap-2">
                    <ImagePreview 
                        requestId={dataToView.requestId}
                        documentName={"Authorization Letter"}
                        on:viewImage={viewHandler}
                    />
                </div>
            </div>
            {/if}
            {#if !!dataToView.guardianInfo}
                <div>
                    <p class="font-semibold">Guardian/s' Valid ID's</p>
                    {#if dataToView.guardianInfo.guardianship === "parents"}
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={dataToView.requestId}
                                documentName={"Mother's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={dataToView.requestId}
                                documentName={"Father's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                    {/if}
                    {#if dataToView.guardianInfo.guardianship === "singleParent" && dataToView.guardianInfo.parentsRelation === "mother"}
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={dataToView.requestId}
                                documentName={"Mother's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                    {/if}
                    {#if dataToView.guardianInfo.guardianship === "singleParent" && dataToView.guardianInfo.parentsRelation === "father"}
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={dataToView.requestId}
                                documentName={"Father's Valid ID"}
                                on:viewImage={viewHandler}
                            />
                        </div>
                    {/if}
                    {#if dataToView.guardianInfo.guardianship === "guardian"}
                        <div class="w-full h-max flex justify-center gap-2">
                            <ImagePreview 
                                requestId={dataToView.requestId}
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
                <img src={imageToEnlarge.imageUrl} alt={imageToEnlarge.requirementName} class="w-[70vw] lg:w-max lg:h-[85vh] hover:cursor-zoom-in" use:zoom={1.1}>
                <p class="text-neutral text-lg underline">{imageToEnlarge.name}</p>
            </div>
        </div>
    {/if}
</section>