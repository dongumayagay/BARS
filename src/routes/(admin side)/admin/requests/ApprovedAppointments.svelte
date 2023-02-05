<script>
    import RequestViewer from "./RequestViewer.svelte";
	import { onSnapshot, query, collection, where } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
	import AppointmentRequestsTable from "./request-preview-components/AppointmentRequestsTable.svelte";

    export let page;

    let dataToView = {};
    let viewing  = false;

    let approvedAppointments = [];

    const unsubscribe = onSnapshot(query(collection(db, "appointmentRequests"), where("status", "==", "Approved")), (querySnapshot) => {
        approvedAppointments = [];
        querySnapshot.forEach((doc) => {
            approvedAppointments = [ ...approvedAppointments, {
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "Appointment Request",
                collectionReference: "appointmentRequests",
                nextStatus: "Appointment Served",
                nextStatusEmailContent: "Good Day! Your appointment has been served. We will mark this request as completed. We hope you had a nice experience. Thank you for using our system!!"
            }]
        })

        console.log(approvedAppointments)
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

<div class="w-full flex flex-col items-center" class:hidden={page !== 2}>
    <div class="w-full flex flex-col items-center py-6" class:hidden={viewing}>
        <div class="overflow-y-auto w-full h-full p-6 flex flex-col gap-4">
                <AppointmentRequestsTable appointmentRequests={approvedAppointments} on:view={viewHandler}/>
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}
</div>