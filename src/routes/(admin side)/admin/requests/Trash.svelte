<script>
    import RequestPreview from "$lib/components/RequestPreview.svelte";
    import RequestViewer from "./RequestViewer.svelte"
    import { db } from '$lib/firebase/client.js'
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    
    export let page;

    let dataToView = [];
    let viewing = false;

    let trashedDocumentRequests = [];
    let trashedAppointmentRequests = [];

    const trashedDocumentRequestsQuery = onSnapshot(query(collection(db, "documentRequests"), where("status", "==", "Trashed")), (querySnapshot) => {
        trashedDocumentRequests = [];
        querySnapshot.forEach((doc) => {
            trashedDocumentRequests = [...trashedDocumentRequests, {
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "Document Request",
                collectionReference: "documentRequests",
            }]
        })
    })

    const trashedAppointmentRequestsQuery = onSnapshot(query(collection(db, "appointmentRequests"), where("status", "==", "Trashed")), (querySnapshot) => {
        trashedAppointmentRequests = [];
        querySnapshot.forEach((doc) => {
            trashedAppointmentRequests = [...trashedAppointmentRequests, {
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "Appointment Request",
                collectionReference: "appointmentRequests",
            }]
        })
    })

    function viewHandler(event) {
        dataToView = event.detail.requestData;
        viewing = true;
    }

    function closeHandler() {
        dataToView = {};
        viewing = false;
    }
</script>

<main class="w-full flex justify-center" class:hidden={page !== 4}>
    <div class="w-full bg-base-100 grid grid-cols-2 justify-center rounded-lg py-6" class:hidden={viewing}>
        <div class="w-full p-4 flex flex-col items-center gap-4">
            <p class="font-bold">Document Requests</p>
            <div class=" overflow-y-auto h-[400px] w-full flex flex-col justify-center gap-4">
                {#if trashedDocumentRequests.length !== 0}
                    {#each trashedDocumentRequests as trashedDocument }
                        <RequestPreview requestData={trashedDocument} on:view={viewHandler}/>
                    {/each}
                {:else}
                    <p class="w-full h-[300px] flex items-center justify-center opacity-100">No trashed document requests to show</p>
                {/if}
    
            </div>
        </div> 
        <div class="w-full p-4 flex flex-col items-center gap-4 border-l-2">
            <p class="font-bold">Appointment Requests</p>
            <div class=" overflow-y-auto h-[400px] w-full flex flex-col justify-center gap-4">
                {#if trashedAppointmentRequests.length !== 0}  
                    {#each trashedAppointmentRequests as trashedAppointment}
                        <RequestPreview requestData={trashedAppointment} on:view={viewHandler}/>
                    {/each}
                {:else}
                    <p class="w-full h-[300px] flex items-center justify-center opacity-100">No trashed appointment requests to show</p>
                {/if}
            </div>
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}

</main>