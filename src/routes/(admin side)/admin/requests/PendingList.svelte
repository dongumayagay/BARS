<script>
    import RequestViewer from "./RequestViewer.svelte"
    import { db } from '$lib/firebase/client.js'
    import { collection, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
	import AllRequests from "./request-preview-components/AllRequests.svelte";
	import DocumentRequestsTable from "./request-preview-components/DocumentRequestsTable.svelte";
	import AppointmentRequestsTable from "./request-preview-components/AppointmentRequestsTable.svelte";
	import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte"
    
    export let page;

    const dispatch = createEventDispatcher();

    onMount(()=>{
        const pendingDocumentRequestsUnsub = onSnapshot(query(collection(db, "documentRequests"), where("status", "==", "pending")), (querySnapshot) => {
            pendingDocumentRequests = querySnapshot.docs.map((doc)=>({
                ...doc.data(), 
                requestId: doc.id,
                typeOfRequest: "Document Request",
                requestPath: "document-request",
                collectionReference: "documentRequests",
                nextStatus: "Ready to claim",
                nextStatusEmailContent: "Good Day! Your requested document/s are now ready. Please bring the original copy of requirements along with you."
            }))
            querySnapshot.docs.map((doc)=>{
                if(!doc.data().isViewed){dispatch("newDocRequest")}
            })
        })
        return()=>{
            pendingDocumentRequestsUnsub();
        }
    })

    onMount(()=>{
        const pendingAppointmentRequestsUnsub = onSnapshot(query(collection(db, "appointmentRequests"), where("status", "==", "pending")), (querySnapshot) => {
            pendingAppointmentRequests = querySnapshot.docs.map((doc)=>({
                ...doc.data(), 
                requestId: doc.id,
                typeOfRequest: "Appointment Request",
                requestPath: "appointment-request",
                collectionReference: "appointmentRequests",
                nextStatus: "Ready to claim",
                nextStatusEmailContent: "Good Day! Your requested document/s are now ready. Please bring the original copy of requirements along with you."
            }))
            querySnapshot.docs.map((doc)=>{
                if(!doc.data().isViewed){dispatch("newAptRequest")}
            })
        })
        return ()=>{
            pendingAppointmentRequestsUnsub()
        }
    })

    let viewing = false;
    let dataToView = {};
    
    let pendingDocumentRequests = [];
    let pendingAppointmentRequests = [];
    let allPendingRequests = [];

    async function viewHandler(event) {
        // if(!event.detail.requestData?.isViewed){
        //     const updateRef = await updateDoc(doc(db, event.detail.requestData.collectionReference, event.detail.requestData.requestId), {
        //         isViewed: true,
        //     })
        //     if(event.detail.requestData.typeOfRequest === "Document Request"){
        //         dispatch("minusDocNotifCounter")
        //     }
        //     if(event.detail.requestData.typeOfRequest === "Appointment Request") {
        //         dispatch("minusAptNotifCounter")
        //     }
        // }
        dataToView = event.detail.requestData;
        viewing = true;

    }

    function closeHandler() {
        dataToView = {};
        viewing = false;
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
		
		pendingDocumentRequests = pendingDocumentRequests.sort(sort);
        pendingAppointmentRequests = pendingAppointmentRequests.sort(sort);
        allPendingRequests = allPendingRequests.sort(sort);
	}

    $: sort(columnToSort, asc);

</script>

<main class="w-full flex justify-center" class:hidden={page !== 0}>
    <div class="w-full bg-base-100 rounded-lg" class:hidden={viewing}>
        <div class="w-full overflow-auto p-6 flex flex-col items-center gap-4">
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
            <div class=" overflow-y-auto overflow-x-auto max-h-[400px] w-full gap-4 py-2">
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