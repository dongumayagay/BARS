<script>
    import RequestViewer from "./RequestViewer.svelte";
	import { onSnapshot, query, collection, where } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
	import DocumentRequestsTable from "./request-preview-components/DocumentRequestsTable.svelte";


    export let page;

    let dataToView = {};
    let viewing  = false;

    let readyToClaimDocuments = [];

    const unsubscribe = onSnapshot(query(collection(db, "documentRequests"), where("status", "==", "Ready to claim")), (querySnapshot) => {
        readyToClaimDocuments = [];
        querySnapshot.forEach((doc) => {
            readyToClaimDocuments = [ ...readyToClaimDocuments, {
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "Document Request",
                collectionReference: "documentRequests",
                nextStatus: "Request Completed",
                nextStatusEmailContent: "Good Day! Your requested document/s are now claimed. We will mark this request as completed. Thank you for using our system!!"
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
		
		readyToClaimDocuments = readyToClaimDocuments.sort(sort);
	}

    $: sort(columnToSort, asc);
</script>

<div class="w-full flex flex-col items-center" class:hidden={page !== 1}>
    <div class="w-full flex flex-col items-center p-6" class:hidden={viewing}>
        <div class="w-full flex justify-center">
            <div class="w-max flex items-center justify-end gap-2">
                <small class="font-semibold">Sort by:</small>
                <select class="select select-sm select-primary w-max" bind:value={columnToSort}>
                    <option value="dateAdded" selected>Date Requested</option>
                    <option value="lastName">Name</option>
                    <option value="lastUpdated">Last Updated</option>
                </select>
                <select class="select select-sm select-primary w-max" bind:value={asc}>
                    <option value={false} selected>Descending</option>
                    <option value={true}>Ascending</option>
                </select>
            </div>
        </div>
        <div class=" w-full flex flex-col gap-4 py-6">
            <DocumentRequestsTable documentRequests={readyToClaimDocuments} on:view={viewHandler} />
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}
</div>