<script>
    import RequestPreview from "$lib/components/RequestPreview.svelte";
    import RequestViewer from "./RequestViewer.svelte"
    import { db } from '$lib/firebase/client.js'
    import { collection, onSnapshot, query, where } from "firebase/firestore";
    
    export let page;

    let viewing = false
    let dataToView = {};

    let pendingDocumentRequests = [];
    let pendingAppointmentRequests = [];

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
</script>

<main class="w-full flex justify-center" class:hidden={page !== 0}>
    <div class="w-full bg-base-100 grid grid-cols-2 justify-center rounded-lg py-6" class:hidden={viewing}>
        <div class="w-full p-4 flex flex-col items-center gap-4">
            <p class="font-bold">Document Requests</p>
            <div class=" overflow-y-auto max-h-[400px] w-full flex flex-col gap-4">
                {#each pendingDocumentRequests as pendingDocument }
                    <RequestPreview requestData={pendingDocument} on:view={viewHandler}/>
                {/each}
    
            </div>
        </div> 
        <div class="w-full p-4 flex flex-col items-center gap-4 border-l-2">
            <p class="font-bold">Appointment Requests</p>
            <div class=" overflow-y-auto max-h-[400px] w-full flex flex-col gap-4">
                {#each pendingAppointmentRequests as pendingAppointment}
                    <RequestPreview requestData={pendingAppointment} on:view={viewHandler}/>
                {/each}
            </div>
        </div>
    </div>
    <div class="w-full" class:hidden={!viewing}>
        <RequestViewer {dataToView} on:close={closeHandler}/>
    </div>

</main>