<script>
    import RequestViewer from "./RequestViewer.svelte"
    import { db } from '$lib/firebase/client.js'
    import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
	import AllRequests from "./request-preview-components/AllRequests.svelte";
	import DocumentRequestsTable from "./request-preview-components/DocumentRequestsTable.svelte";
	import AppointmentRequestsTable from "./request-preview-components/AppointmentRequestsTable.svelte";
    
    export let page;

    let viewing = false;
    let dataToView = {};

    let pendingDocumentRequests = [];
    let pendingAppointmentRequests = [];
    let allPendingRequests = [];

    const unsubPendingDocRequestsFetcher = onSnapshot(query(collection(db, "documentRequests"), where("status", "==", "pending")), (querySnapshot) => {
        pendingDocumentRequests = [];
        querySnapshot.forEach((doc) => {
            pendingDocumentRequests = [...pendingDocumentRequests, {
                ...doc.data(), 
                requestId: doc.id,
                typeOfRequest: "Document Request",
                collectionReference: "documentRequests",
                nextStatus: "Ready to claim",
                nextStatusEmailContent: "Good Day! Your requested document/s are now ready. Please bring the original copy of requirements along with you."
            }]
        })
    })

    const unsubPendingAptRequestsFetcher = onSnapshot(query(collection(db, "appointmentRequests"), where("status", "==", "pending")), (querySnapshot) => {
        pendingAppointmentRequests = []
        querySnapshot.forEach((doc) => {
            pendingAppointmentRequests = [...pendingAppointmentRequests, {
                ...doc.data(), 
                requestId: doc.id,
                typeOfRequest: "Appointment Request",
                collectionReference: "appointmentRequests",
                nextStatus: "Approved",
                nextStatusEmailContent: "Good Day! Your requested date and schedule is approved. Please come to the office on your scheduled time."
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

    function sortRequests(a, b, col, ascending){
        if(ascending) return a - b;
        return b - a;
    }

    $: allPendingRequests = [
        ...pendingDocumentRequests,
        ...pendingAppointmentRequests,
    ]

    let typeOfRequestToShow;
    let columnToSort;
    let asc;
	
	$: sort = (column, asc) => {
		let sortModifier = (asc) ? 1 : -1;
		
		let sort = (a, b) => 
			(a[column] < b[column]) 
			? -1 * sortModifier 
			: (a[column] > b[column]) 
			? 1 * sortModifier 
			: 0;
		
		pendingDocumentRequests = pendingDocumentRequests.sort(sort);
        pendingAppointmentRequests = pendingAppointmentRequests.sort(sort);
        allPendingRequests = allPendingRequests.sort(sort);
	}

    $: sort(columnToSort, asc);



</script>

<main class="w-full flex justify-center" class:hidden={page !== 0}>
    <div class="w-full bg-base-100 rounded-lg" class:hidden={viewing}>
        <div class="w-full p-6 flex flex-col items-center gap-4">
            <div class="w-full flex justify-between">
                <div class="w-max flex items-center gap-2">
                    <small class="font-semibold">Show: </small>
                    <select class="select select-sm select-primary w-full max-w-xs" bind:value={typeOfRequestToShow}>
                        <option value="all" selected>All</option>
                        <option value="documents">Document Requests</option>
                        <option value="appointments">Appointment Requests</option>
                    </select>
                </div>
                <div class="w-max flex items-center justify-end gap-2">
                    <small class="font-semibold">Sort by:</small>
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
            <div class=" overflow-y-auto max-h-[400px] w-full gap-4 py-2">
                    {#if typeOfRequestToShow === "all"}
                        <AllRequests allRequests={allPendingRequests} on:view={viewHandler}/>
                    {:else if typeOfRequestToShow === "documents"}
                        <DocumentRequestsTable documentRequests={pendingDocumentRequests} on:view={viewHandler}/>
                    {:else if typeOfRequestToShow === "appointments"}
                        <AppointmentRequestsTable appointmentRequests={pendingAppointmentRequests} on:view={viewHandler}/>
                    {/if}
            </div>
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}

</main>