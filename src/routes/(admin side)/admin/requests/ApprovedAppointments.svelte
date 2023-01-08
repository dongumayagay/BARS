<script>
    import RequestPreview from "../../../../lib/components/RequestPreview.svelte";
    import RequestViewer from "./RequestViewer.svelte";
	import { onSnapshot, query, collection, where } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"

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
        <p class="w-max h-max text-center mb-4 p-2 rounded-lg font-bold">Approved Appointment Schedules</p>
        <div class="overflow-y-auto max-h-[400px] p-6 flex flex-col gap-4">
            {#each approvedAppointments as approvedAppointment }
                <RequestPreview requestData={approvedAppointment} on:view={viewHandler}/>
            {/each}
        </div>
    </div>
    <div class="w-full" class:hidden={!viewing}>
        <RequestViewer {dataToView} on:close={closeHandler}/>
    </div>
</div>