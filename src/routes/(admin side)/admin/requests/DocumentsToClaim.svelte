<script>
    import RequestViewer from "./RequestViewer.svelte";
	import { onSnapshot, query, collection, where, Timestamp, updateDoc, doc } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
	import DocumentRequestsTable from "./request-preview-components/DocumentRequestsTable.svelte";
	import { onMount } from "svelte";
	import RequestNotifierPrompt from "./emailNotificationsComponents/RequestNotifierPrompt.svelte";
    import { Circle } from "svelte-loading-spinners";
    import { notifyExpiringRequest } from "$lib/sendEmailNotifications/expiringDocumentRequestNotifier.js"
    import { notifyExpiredRequest } from "$lib/sendEmailNotifications/expiredDocumentRequestNotifier.js"
    import { months, weekDays} from "$lib/stores.js"


    export let page;

    let dataToView = {};
    let viewing  = false;

    let readyToClaimDocuments = [];
    let expiringDocumentRequests = [];
    let expiredDocumentRequests = [];

    let loadingStatement;
    let showLoadingScreen = false;


    onMount(()=>{
        const unsubscribe = onSnapshot(query(collection(db, "documentRequests"), where("status", "==", "Ready to claim")), (querySnapshot) => {
            readyToClaimDocuments = querySnapshot.docs.map((doc)=>({
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "Document Request",
                requestPath: "document-request",
                collectionReference: "documentRequests",
                nextStatus: "Request Completed",
                nextStatusEmailContent: "Good Day! Your requested document/s are now claimed. We will mark this request as completed."
            }))
            const today = new Date().valueOf();
            const dateToday = new Date().toLocaleDateString();
            const dateTodayISO = new Date(dateToday).toISOString().split("T")[0];
            expiringDocumentRequests = readyToClaimDocuments.filter((doc)=> {
                const lastUpdatedValue = new Timestamp(doc.lastUpdated.seconds, doc.lastUpdated.nanoseconds).toMillis();
                return (today >= lastUpdatedValue + 432000000 && today <= lastUpdatedValue + 604800000) && (doc.isNotified === undefined || doc.isNotified === false)
            })
            console.log("Expiring Doc Requests => ", expiringDocumentRequests)
            expiredDocumentRequests = readyToClaimDocuments.filter((doc)=>{
                const lastUpdatedValue = new Timestamp(doc.lastUpdated.seconds, doc.lastUpdated.nanoseconds).toMillis();
                const expiryDateString = new Date(lastUpdatedValue + 604800000).toISOString().split("T")[0];
                console.log(dateTodayISO, expiryDateString,(dateTodayISO >= expiryDateString));
                return (dateTodayISO >= expiryDateString)
                // console.log(new Date(new Timestamp(doc.lastUpdated.seconds, doc.lastUpdated.nanoseconds).toMillis()).toISOString().split("T")[0])
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
		
		readyToClaimDocuments = readyToClaimDocuments.sort(sort);
	}

    $: sort(columnToSort, asc);
    $: console.log("Expiring Document Requests =>",expiringDocumentRequests);
    $: console.log("Expired Document Requests =>",expiredDocumentRequests);
    $: if(!!expiringDocumentRequests){
        showLoadingScreen = true;
        loadingStatement = "Notifying expiring requests...."
        expiringDocumentRequests.map(async (request)=>{
            const lastUpdated = new Timestamp(request.lastUpdated.seconds, request.lastUpdated.nanoseconds).toMillis();
            const expiryDate = new Date( lastUpdated + 864000000);
            const expiryDateString = weekDays[expiryDate.getDay()] + ", " + months[expiryDate.getMonth()] + " " + expiryDate.getDate();
            await notifyExpiringRequest(request, expiryDateString);
            await updateDoc(doc(db, "documentRequests", request.requestId), {
                isNotified: true,
            })
        })
        showLoadingScreen = false;
    }
    $: if(!!expiredDocumentRequests){
        expiredDocumentRequests.map(async (request)=>{
            const lastUpdated = new Timestamp(request.lastUpdated.seconds, request.lastUpdated.nanoseconds).toDate();
            const lastUpdatedString = weekDays[lastUpdated.getDay()] + ", " + months[lastUpdated.getMonth()] + " " + lastUpdated.getDate(); 
            await notifyExpiredRequest(request, lastUpdatedString);
            await updateDoc(doc(db, "documentRequests", request.requestId), {
                status: "Closed",
            })
        })
    }
</script>

<div class="w-full h-full flex flex-col items-center" class:hidden={page !== 1}>
    <!-- <section class="w-full flex justify-end p-2">
        
    </section> -->
    {#if showLoadingScreen}
        <section class="fixed top-0 left-0 w-full h-full bg-black/70 flex justify-center rounded-lg z-20">
            <div class="w-full h-[300px] flex flex-col items-center justify-center gap-2">
                <Circle color={"#fff"}/>
                <p class="text-white">{loadingStatement}</p>
            </div>
        </section>
    {/if}
    <div class="w-full h-full  flex flex-col items-center p-6" class:hidden={viewing}>
        <div class="w-full h-full flex justify-center">
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
        <div class="w-full h-full overflow-auto flex flex-col gap-4 py-6">
            <DocumentRequestsTable documentRequests={readyToClaimDocuments} on:view={viewHandler} />
        </div>
    </div>
    {#if viewing}
        <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}
</div>