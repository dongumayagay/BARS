<script>
    import RequestViewer from "./RequestViewer.svelte"
    import { db } from '$lib/firebase/client.js'
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    import AllRequests from "./request-preview-components/AllRequests.svelte";
	import DocumentRequestsTable from "./request-preview-components/DocumentRequestsTable.svelte";
	import AppointmentRequestsTable from "./request-preview-components/AppointmentRequestsTable.svelte";
    
    export let page;

    let typeOfRequestToShow;
    let dataToView = [];
    let viewing = false;

    let trashedDocumentRequests = [];
    let trashedAppointmentRequests = [];
    let allTrashedRequests = [];

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

    $: allTrashedRequests = [
        ...trashedAppointmentRequests,
        ...trashedDocumentRequests
    ]
</script>

<main class="w-full flex justify-center" class:hidden={page !== 4}>
    <div class="w-full bg-base-100 justify-center rounded-lg py-6" class:hidden={viewing}>
        <div class="w-full p-4 flex flex-col items-center gap-4">
            <div class="w-full flex justify-between">
                <div class="flex items-center gap-2">
                    <small class="font-semibold">Show: </small>
                    <select class="select select-sm select-primary w-full max-w-xs" bind:value={typeOfRequestToShow}>
                        <option value="all" selected>All</option>
                        <option value="documents">Document Requests</option>
                        <option value="appointments">Appointment Requests</option>
                    </select>
                </div>
            </div>
            <div class="h-[400px] w-full flex flex-col gap-4">
                {#if typeOfRequestToShow === "all"}
                    <AllRequests allRequests={allTrashedRequests} on:view={viewHandler}/>
                {:else if typeOfRequestToShow === "documents"}
                    <DocumentRequestsTable documentRequests={trashedDocumentRequests} on:view={viewHandler}/>
                {:else if typeOfRequestToShow === "appointments"}
                    <AppointmentRequestsTable appointmentRequests={trashedAppointmentRequests} on:view={viewHandler}/>
                {/if}
            </div>
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}

</main>