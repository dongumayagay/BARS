<script>
    import {collection, onSnapshot, query, where} from "firebase/firestore";
    import {db} from "$lib/firebase/client.js"
    import AllRequests from "./request-preview-components/AllRequests.svelte";
    import AppointmentRequestsTable from "./request-preview-components/AppointmentRequestsTable.svelte";
    import DocumentRequestsTable from "./request-preview-components/DocumentRequestsTable.svelte";
	import RequestViewer from "./RequestViewer.svelte";

    export let page;

    let servedDocumentRequests = [];
    let servedAppointmentRequests = [];
    let allServedRequests = [];

    let dataToView = {};
    let typeOfRequestToShow;
    let viewing = false;

    const servedDocumentRequestsListener = onSnapshot(query(collection(db, "documentRequests"), where("status", "==", "Request Completed")), (querySnapshot)=>{
        servedDocumentRequests = [];
        querySnapshot.forEach((doc)=>{
            servedDocumentRequests = [...servedDocumentRequests, {
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "Document Request",
                requestPath: "document-request",
                collectionReference: "documentRequests",
            }];
        })
    })
    const servedAppointmentRequestsListener = onSnapshot(query(collection(db, "appointmentRequests"), where("status", "==", "Appointment Served")), (querySnapshot)=>{
        servedAppointmentRequests = [];
        querySnapshot.forEach((doc)=>{
            servedAppointmentRequests = [...servedAppointmentRequests, {
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "Appointment Request",
                collectionReference: "appointmentRequests",
                requestPath: "appointment-request",
            }];
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

    $: allServedRequests = [
        ...servedDocumentRequests,
        ...servedAppointmentRequests
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
		
		servedDocumentRequests = servedDocumentRequests.sort(sort);
        servedAppointmentRequests = servedAppointmentRequests.sort(sort);
        allServedRequests = allServedRequests.sort(sort);
	}

    $: sort(columnToSort, asc);
</script>


<main class="w-full h-full flex justify-center" class:hidden={page !== 3}>
    <div class="w-full h-full bg-base-100 rounded-lg" class:hidden={viewing}>
        <div class="w-full h-full p-6 flex flex-col items-center gap-4">
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
            <div class=" overflow-auto max-h-[400px] w-full gap-4 py-2">
                    {#if typeOfRequestToShow === "all"}
                        <AllRequests allRequests={allServedRequests} on:view={viewHandler}/>
                    {:else if typeOfRequestToShow === "documents"}
                        <DocumentRequestsTable documentRequests={servedDocumentRequests} on:view={viewHandler}/>
                    {:else if typeOfRequestToShow === "appointments"}
                        <AppointmentRequestsTable appointmentRequests={servedAppointmentRequests} on:view={viewHandler}/>
                    {/if}
            </div>
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}
</main>