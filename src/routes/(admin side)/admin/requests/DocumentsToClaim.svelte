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

</script>

<div class="w-full flex flex-col items-center" class:hidden={page !== 1}>
    <div class="w-full flex flex-col items-center p-4" class:hidden={viewing}>
        <div class=" w-full flex flex-col gap-4">
            <DocumentRequestsTable documentRequests={readyToClaimDocuments} on:view={viewHandler} />
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}
</div>