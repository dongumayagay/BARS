<script>
    import { createEventDispatcher } from "svelte";
    import { doc, updateDoc } from "firebase/firestore"; 
    import { db } from "$lib/firebase/client.js"
    import { sendEmail } from '$lib/utils';
	import RequestBasicInfo from "./requestViewerCards/RequestBasicInfo.svelte";
	import DocumentsRequested from "./requestViewerCards/DocumentsRequested.svelte";
	import SelectedDateAndOfficial from "./requestViewerCards/SelectedDateAndOfficial.svelte";

    const dispatch = createEventDispatcher();

    export let dataToView;

    async function updateHandler() {
        try {
            const docRef = doc(db, dataToView.collectionReference, dataToView.requestId);

            if(dataToView.status === "Trashed"){
                await updateDoc(docRef, {
                    status: dataToView?.previousStatus,
                })
            } else {
                await updateDoc(docRef, {
                    status: dataToView.nextStatus,
                })
            }

            const result = await sendEmail({
                to: dataToView.email,
                subject: dataToView.typeOfRequest + 'Status Update',
                html: '<p>' + dataToView.nextStatusEmailContent??[] + '<p>'
            });

            console.log(JSON.stringify(result))
            alert("This request's status has been successfully updated, click OK to close")
            dispatch("close")
        } catch (error) {
            console.log(error)
        }  
    }

    async function trashHandler() {
        try {
            const docRef = doc(db, dataToView.collectionReference, dataToView.requestId);

            const docUpdate = await updateDoc(docRef, {
                previousStatus: dataToView.status,
                status: "Trashed",
            })
            console.log(docRef)
            alert("Successfully moved to trash")
            dispatch("close")
        } catch (error) {
            alert(error)
        }
    }
</script>

<div class="w-full h-full flex flex-col items-center p-4">
    <div class="w-full flex justify-between items-center">
        <button class="btn btn-ghost hover:bg-inherit flex gap-[1px]" on:click={() => dispatch("close")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p class="hover:underline">Close</p>
        </button>
        <div class="flex gap-2">
            {#if dataToView.status !== 'Trashed'}
            <button class="btn btn-success btn-sm text-sm hover:underline hover:scale-105 active:scale-100" on:click={updateHandler}>Update Status to: {dataToView.nextStatus}</button>
            <button class="btn btn-error btn-sm flex gap-2 hover:scale-105 active:scale-100" on:click={trashHandler}>
                <p>Move to Trash</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
            {:else}
            <button class="btn btn-info btn-sm text-sm hover:underline hover:scale-105 active:scale-100" on:click={updateHandler}>Revert Status to: {dataToView?.previousStatus}</button>
            {/if}
        </div>
    </div>
    <div class="p-4 w-full h-max flex items-center justify-center">
        <section class="w-[90vw] lg:w-[60vw] flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4">
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
                            selectedOfficial: dataToView.selectedOfficial??[]
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
    </div>
</div>