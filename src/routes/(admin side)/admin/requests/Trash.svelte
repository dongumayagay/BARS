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
                requestPath: "document-request"
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
                requestPath: "appointment-request"
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

    let columnToSort;
    let asc;
	
	$: sort = (column, asc) => {
		let sortModifier = (asc) ? 1 : -1;
		
		let sort = (a, b) => 
        (column === "lastName")
        ?
            (JSON.stringify(a[column]).toLowerCase() < JSON.stringify(b[column]).toLowerCase()) 
            ? -1 * sortModifier 
            : (JSON.stringify(a[column]).toLowerCase() > JSON.stringify(b[column]).toLowerCase()) 
            ? 1 * sortModifier 
            : 0
        :
            (a[column] < b[column]) 
                ? -1 * sortModifier 
                : (a[column] > b[column]) 
                ? 1 * sortModifier 
                : 0
		
		trashedDocumentRequests = trashedDocumentRequests.sort(sort);
        trashedAppointmentRequests = trashedAppointmentRequests.sort(sort);
        allTrashedRequests = allTrashedRequests.sort(sort);
	}

    $: sort(columnToSort, asc);
</script>

<main class="w-full flex justify-center" class:hidden={page !== 4}>
    <div class="w-full bg-base-100 justify-center rounded-lg" class:hidden={viewing}>
        <div class="w-full p-6 flex flex-col items-center gap-4">
            <div class="w-full flex flex-wrap justify-between gap-2">
                <div class="w-full lg:w-max flex items-center justify-between lg:justify-center gap-2">
                    <small class="w-[20%] text-center font-semibold">Show: </small>
                    <div class="w-full flex justify-center items-center">
                        <select class="select select-sm select-primary w-max" bind:value={typeOfRequestToShow}>
                            <option value="all" selected>All</option>
                            <option value="documents">Document Requests</option>
                            <option value="appointments">Appointment Requests</option>
                        </select>
                    </div>
                </div>
                <div class="w-full lg:w-max flex items-center justify-center lg:justify-end gap-2">
                    <small class="w-[20%] text-center font-semibold">Sort by:</small>
                    <div class="w-full flex flex-wrap lg:flex-nowrap justify-center items-center">
                        <select class="select select-sm select-primary w-max" bind:value={columnToSort}>
                            <option value="dateAdded" selected>Date Requested</option>
                            <option value="lastName">Name</option>
                        </select>
                        <select class="select select-sm select-primary w-max" bind:value={asc}>
                            <option value={false} selected>Descending</option>
                            <option value={true}>Ascending</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="h-[400px] w-full flex flex-col gap-4 py-2">
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