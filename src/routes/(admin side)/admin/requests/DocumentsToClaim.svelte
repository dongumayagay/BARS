<script>
    import RequestPreview from "../../../../lib/components/RequestPreview.svelte";
    import RequestViewer from "./RequestViewer.svelte";
	import { onSnapshot, query, collection, where } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"


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
    <div class="w-full flex flex-col items-center py-6" class:hidden={viewing}>
        <p class="w-max h-max text-center mb-4 p-2 rounded-lg font-bold">Ready to claim documents</p>
        <div class=" overflow-y-auto max-h-[400px] flex flex-col gap-4">
            {#each readyToClaimDocuments as readyToClaimDocument }
                <RequestPreview requestData={readyToClaimDocument} on:view={viewHandler}/>
            {/each}
        </div>
    </div>
    <div class="w-full" class:hidden={!viewing}>
        <RequestViewer {dataToView} nextStatus={dataToView.nextStatus} on:close={closeHandler}/>
    </div>
</div>