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
    export let nextStatus;
    // export let collectionReference;

    async function updateHandler() {
        try {
            const docRef = doc(db, dataToView.collectionReference, dataToView.requestId);

            await updateDoc(docRef, {
                status: nextStatus,
            })

            const result = await sendEmail({
                to: dataToView.email,
                subject: dataToView.typeOfRequest + 'Status Update',
                html: '<p>' + dataToView.nextStatusEmailContent??[] + '<p>'
            });

            console.log(JSON.stringify(result))
            alert("This request's status has been successfully updated, click OK to close")
            dispatch("close")
            // console.log(dataToView.collectionReference, dataToView.requestId)
        } catch (error) {
            console.log(error)
        }
        
    }
</script>

<div class="w-full h-full flex flex-col items-center p-4">
    <div class="w-full flex justify-start">
        <button class="btn btn-ghost hover:bg-inherit flex gap-[1px]" on:click={() => dispatch("close")}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p class="hover:underline">Close</p>
        </button>
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
                <div class="w-full flex flex-col items-start">
                    <div class="flex gap-2">
                        <small>Status:</small>
                        <small 
                            class="font-semibold"
                            class:text-info={dataToView.status === "pending"}
                            class:text-success={dataToView.status === "Ready to claim" || dataToView.status === "Approved"}
                        >{dataToView.status}</small>
                    </div>
                    <button class="text-sm hover:underline" on:click={updateHandler}>Update Status to: {nextStatus}</button>
                </div>
            </div>
        </section>
        <!-- <p>{JSON.stringify(dataToView)}</p> -->
    </div>
</div>
<!-- {
    name: dataToView.selectedOfficials?.name,
    position: dataToView.selectedOfficials?.position
} -->