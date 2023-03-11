<script>
    import { createEventDispatcher } from "svelte";
    import { addDoc, doc, Timestamp, updateDoc, collection, deleteDoc, query, where, getDoc, getDocs, orderBy } from "firebase/firestore"; 
    import { db, storage } from "$lib/firebase/client.js"
    import { sendEmail } from '$lib/utils';
	import NavigationButtons from "./requestViewerComponents/NavigationButtons.svelte";
	import RequestDetails from "./requestViewerComponents/request-details-components/RequestDetails.svelte";
	import RequestMessages from "./requestViewerComponents/messaging-components/RequestMessages.svelte";
	import { deleteObject, listAll, ref } from "firebase/storage";
    // import { indigency, residency } from "$lib/jspdf.js";
    import { clearance } from "$lib/jspdf/clearance.js"
    import { indigency }  from "$lib/jspdf/indigency.js"
    import { residency }  from "$lib/jspdf/residency.js"
    import { Circle } from "svelte-loading-spinners";
    
    
    const dispatch = createEventDispatcher();

    export let dataToView;
    // export let officialsList;
    let page = 0;
    let showLoadingScreen = false;
    let loadingStatement;

    async function updateHandler() {
        try {
            showLoadingScreen = true;
            const docRef = doc(db, dataToView.collectionReference, dataToView.requestId);
            // const something = await getDoc(docRef)
            if(dataToView.nextStatus === "Ready to claim"){
                loadingStatement = "Generating Document..."
                const officialsList = await getDocs(query(collection(db, "officialsList"), orderBy("positionOrder", "asc")))
                await dataToView.docsRequested.map((doc)=>{
                    console.log(doc.documentNo)
                    switch(doc.documentNo){
                        case 1:
                            clearance(officialsList, dataToView);
                            break;
                        case 2:
                            indigency(officialsList, dataToView);
                            break;
                        case 3:
                            residency(officialsList, dataToView);
                            break;
                    }
                })
            }

            if(dataToView.status === "Trashed"){
                loadingStatement = "Reverting Status..."
                await updateDoc(docRef, {
                    status: dataToView?.previousStatus,
                    previousStatus: "",
                    lastUpdated: Timestamp.now()
                })
            } else {
                loadingStatement = "Updating Request Status..."
                if(dataToView.nextStatus === "Request Completed"){ 
                    clearDocumentRequestFiles();
                     
                }
                await updateDoc(docRef, {
                    status: dataToView.nextStatus,
                    lastUpdated: Timestamp.now()
                })
            }

            loadingStatement = "Sending Email Notification..."
            const result = await sendEmail({
                to: dataToView.email,
                subject: dataToView.typeOfRequest + 'Status Update',
                html: `
                <h1>Hello ${dataToView.firstName},</h1>
                <p> ${dataToView.nextStatusEmailContent??[]}</p>
                <a href="https://bars-gf.vercel.app/${dataToView.requestPath}/${dataToView.requestId}">Here: [https://bars-gf.vercel.app/${dataToView.requestPath}/${dataToView.requestId}]</a><p> is your tracker-id if you wish to view or track your request</p>
                ${dataToView.nextStatus === "Request Completed" || dataToView.nextStatus === "Appointment Served" ? "<p>If you have time, please do fill up our feedback form attached below:</p>" : ""}
                ${dataToView.nextStatus === "Request Completed" || dataToView.nextStatus === "Appointment Served" ? "<a href=\"https://forms.gle/XiPycVoJ8BsTm7jaA\">https://forms.gle/XiPycVoJ8BsTm7jaA</a>" : ""}
                <p>Thank you for using B.A.R.S.!</p>
                `
            });
            

            console.log(JSON.stringify(result))
            // alert("This request's status has been successfully updated, click OK to close")
            loadingStatement = "Finishing Status Update..."
            dispatch("close")
            loadingStatement = "";
        } catch (error) {
            console.log(error)
        }  
    }

    async function trashHandler() {
        try {
            const docRef = doc(db, dataToView.collectionReference, dataToView.requestId);

            await updateDoc(docRef, {
                previousStatus: dataToView.status,
                status: "Trashed",
            })
            // alert("Successfully moved to trash")
            dispatch("close")
        } catch (error) {
            alert(error)
        }
    }

    async function removeHandler(){
        try{
            let requestId = dataToView.requestId;

            const requestMessages = await getDocs(query(collection(db, "requestMessages"), where("trackingId", "==", "id-" + requestId)));
            requestMessages.forEach((message)=>{
                deleteDoc(doc(db, "requestMessages", message.id))
            })
            console.log("messages have been successfully deleted")

            listAll(ref(storage, "message_files/" + requestId))
            .then((files)=>{
                files.items.forEach((file) => {
                    const fileRef = ref(storage, file.fullPath)
                    deleteObject(fileRef)
                })
                console.log("message files have been successfully deleted")
            })

            if(dataToView.typeOfRequest === "Document Request"){
                clearDocumentRequestFiles()
            }
            await deleteDoc(doc(db, dataToView.collectionReference, dataToView.requestId))
            alert("Request removed successfully")
            dispatch("close")
        }catch(error){
            alert(error.message)
        }
    }

    function clearDocumentRequestFiles(){
        listAll(ref(storage, "documentRequestsFiles/" + dataToView.requestId))
        .then((requirements)=>{
            requirements.prefixes.forEach((requirement) => {
                listAll(ref(storage, requirement.fullPath)).then((files)=>{
                    files.items.forEach((file)=>{
                        const fileRef = ref(storage, file.fullPath)
                        deleteObject(fileRef)
                    })
                })
            })
            console.log("Files removed successfully");
        })
    }
</script>

<div class="w-full h-full flex flex-col items-center p-4 relative">
    <div class="w-full flex justify-between items-center">
        <button class="btn btn-ghost hover:bg-inherit flex gap-[1px]" on:click={() => {dispatch("close")}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p class="hover:underline">Close</p>
        </button>
        <!-- {#if dataToView.}
            
        {/if} -->
        <div class="flex gap-2">
            {#if dataToView.status !== 'Trashed' && dataToView.nextStatus !== undefined}
            <button class="btn btn-success btn-sm text-sm hover:underline hover:scale-105 active:scale-100" on:click={updateHandler}>Update Status to: {dataToView.nextStatus}</button>
            <button class="btn btn-error btn-sm flex gap-2 hover:scale-105 active:scale-100" on:click={trashHandler}>
                <p>Move to Trash</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
            {:else if dataToView.status === 'Trashed' }
            <button class="btn btn-info btn-sm text-sm hover:underline hover:scale-105 active:scale-100" on:click={updateHandler}>Revert Status to: {dataToView?.previousStatus}</button>
            <button class="btn btn-error btn-sm flex gap-2 hover:scale-105 active:scale-100" on:click={removeHandler}>
                <p>Remove Request</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
            {/if}
        </div>
    </div>
    <div class="p-4 w-full h-max min-h-[80vh] flex flex-col lg:flex-row items-start justify-start gap-10">
        <NavigationButtons {page} on:navigate={(event) => page = event.detail.index}/>
        <section class="w-full" class:hidden={page !== 0}>
            <RequestDetails {dataToView} on:viewImage={(event)=>console.log(event.detail.url)}/>
        </section>
        <section class="h-full w-full lg:border-l-[1px] border-accent" class:hidden={page !== 1}>
            <RequestMessages 
                requestId = {dataToView.requestId} 
                requesterFullName={dataToView.lastName + ", " + dataToView.firstName + " " + dataToView.middleName}
                requestPath={dataToView.requestPath} requestorEmail = {dataToView.email} status={dataToView.status}
            />
        </section>
    </div>
    {#if showLoadingScreen}
        <section class="absolute top-0 left-0 bg-black/70 w-full h-full flex flex-col justify-center items-center gap-2 rounded-xl">
            <Circle color="#fff"/>
            <p class="text-white">{loadingStatement}</p>
        </section>
    {/if}
</div>