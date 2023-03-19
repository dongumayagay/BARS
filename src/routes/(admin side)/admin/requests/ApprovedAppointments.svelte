<script>
    import RequestViewer from "./RequestViewer.svelte";
	import { onSnapshot, query, collection, where, doc, updateDoc } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js";
	import AppointmentRequestsTable from "./request-preview-components/AppointmentRequestsTable.svelte";
	import { onMount } from "svelte";
    import { notifyUpcomingRequest } from "$lib/sendEmailNotifications/notifyUpcomingAppointmentRequests.js";
    import { notifyUnattendedRequest } from "$lib/sendEmailNotifications/notifyUnattendedAppointmentRequests.js";

    export let page;

    let dataToView = {};
    let viewing  = false;

    let approvedAppointments = [];
    let upcomingAppointments = [];
    let unattendedAppointments = [];

    onMount(()=>{
        const unsubscribe = onSnapshot(query(collection(db, "appointmentRequests"), where("status", "==", "Approved")), (querySnapshot) => {
            approvedAppointments = querySnapshot.docs.map((doc)=>({
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "Appointment Request",
                requestPath: "appointment-request",
                collectionReference: "appointmentRequests",
                nextStatus: "Appointment Served",
                nextStatusEmailContent: "Good Day! Your appointment has been served. We will mark this request as completed. We hope you had a nice experience.",
            }))
            const today = new Date();
            upcomingAppointments = approvedAppointments.filter((doc)=>{
                const appointmentDate = new Date(doc.dateInput);
                return (appointmentDate.valueOf() > today.valueOf() && appointmentDate.valueOf() - today.valueOf() <= 86400000) || (today.getDay === 5 && appointmentDate.getDay === 1)
            })
            unattendedAppointments = approvedAppointments.filter((doc)=>{
                const appointmentDate = new Date(doc.dateInput);
                return (today.valueOf() > appointmentDate.valueOf());
            })
        })
        return ()=>{
            unsubscribe();
        }
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
		
		approvedAppointments = approvedAppointments.sort(sort);
	}

    $: sort(columnToSort, asc);
    $: console.log("Upcoming Appointments => ",upcomingAppointments);
    $: console.log("Unattended Appointments => ", unattendedAppointments);
    $: if(!!upcomingAppointments){
        upcomingAppointments.map(async (request)=>{
            await notifyUpcomingRequest(request)
        })
    }
    $: if(!!unattendedAppointments){
        unattendedAppointments.map(async (request)=>{
            await notifyUnattendedRequest(request);
            // await updateDoc(doc(db, "appointmentRequests", request.requestId), {
            //     status: "Closed",
            // });
        })
    }
</script>

<div class="w-full flex flex-col items-center" class:hidden={page !== 2}>
    <div class="w-full flex flex-col items-center py-6" class:hidden={viewing}>
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
        <div class="overflow-auto w-full h-full p-6 flex flex-col gap-4">
                <AppointmentRequestsTable appointmentRequests={approvedAppointments} on:view={viewHandler}/>
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}
</div>