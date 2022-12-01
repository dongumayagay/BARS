<script>
    import InfoForm from "$lib/components/InfoForm.svelte";
    import DocumentsList from "./DocumentsList.svelte";
    import FileUpload from "./FileUpload.svelte";
    import Confirm from "./Confirm.svelte";
    import RequestCompleted from "./RequestCompleted.svelte";
    import { db,  storage } from "$lib/firebase/client.js";
    import { Timestamp, collection, addDoc } from "firebase/firestore";
    import { ref, uploadBytes } from "firebase/storage";
    import { sendEmail } from '$lib/utils';

    let requestComplete = false;
    let page = 0;

    let requestId;

    let documentRequest = {}

    function nextHandler(event) {
        documentRequest = Object.assign(documentRequest, event.detail)
        page += 1;
    }

    async function emailRequestId(email, documentRequestId) {
		const result = await sendEmail({
			to: email,
			subject: 'Document Request Tracker',
			html: '<a href="https://bars-git-documents-request-page-dongumayagay.vercel.app/document-request/' + documentRequestId + '">Click Here</a>'
		});

        console.log(JSON.stringify(result))
        alert("An email containing this request's tracker link has been sent");
	}
    
    // $: console.log(documentRequest)
    async function submitToDatabase(){
        try {
                const documentRequestRef = await addDoc(collection(db, 'documentRequests'),{
                    lastName: documentRequest.contactInfo.lastName,
                    firstName: documentRequest.contactInfo.firstName,
                    middleName: documentRequest.contactInfo.middleName,
                    completeAddress: documentRequest.contactInfo.address,
                    contactNo: documentRequest.contactInfo.contactNo,
                    birthDate: documentRequest.contactInfo.birthdate,
                    email: documentRequest.contactInfo.email,
                    dateAdded: Timestamp.now(),
                    docsRequested: documentRequest.listOfRequestedDocuments,
                    docPurpose: documentRequest.contactInfo.purpose,
                    status: "pending"
                })

                const fileUploadPromises = documentRequest.filesToUpload.map((value)=>{
                    const pathName = "documentRequestsFiles/" + documentRequestRef.id + "/" + value.requestedDocumentName + "/" + value.requirementName + "." + value.file[0].type.split('/')[1];
                    const storageReference =  ref(storage, pathName);

                    return uploadBytes(storageReference, value.file[0]);
                    // return pathName;
                })

                const fileUploadPromisesResult = await Promise.all(fileUploadPromises)
                emailRequestId(documentRequest.contactInfo.email, documentRequestRef.id);
                requestId = documentRequestRef.id;
                requestComplete = true;

                console.log(documentRequestRef.id)
            } catch (error) {
                const errorMessage = error.errorMessage;
            }
    }
</script>

<svelte:head>
    <title>Document Request | B.A.R.S.</title>
</svelte:head>

<div class="p-3 flex flex-col items-center gap-4">
    
    {#if !requestComplete}
        <ul class="steps lg:w-[75%]">
            <li class="step font-semibold" class:step-success={page >= 0} class:text-xs={page!==0}>Contact Info</li>
            <li class="step {page >= 1 ? "step-success font-semibold": "text-black/50"}" class:text-xs={page!==1}>Documents to Request</li>
            <li class="step {page >= 2 ? "step-success font-semibold": "text-black/50"}" class:text-xs={page!==2}>Upload Requirements</li>
            <li class="step {page === 3 ? "step-success font-semibold": "text-black/50"}" class:text-xs={page!==3}>Confirm</li>
        </ul>
        
        <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 0}>
            <InfoForm on:next={nextHandler}/>
        </div>
        
        <div class="w-[95%] lg:w-[45%] p-4 bg-neutral rounded-xl flex justify-start shadow-xl" class:hidden={page !== 1}>
            <DocumentsList on:next={nextHandler} on:back={()=>page -= 1 }/>
        </div>

        <div class="w-[95%] lg:w-[45%] p-4 lg:px-6 bg-neutral rounded-xl flex justify-center shadow-xl" class:hidden={page !== 2}>
            <FileUpload listOfRequestedDocuments={documentRequest?.listOfRequestedDocuments??[]} on:next={nextHandler} on:back={()=>page -= 1 }/>
        </div>

        <div class:hidden={page !== 3}>
            <div class="w-[95%] lg:w-max p-4 lg:px-6 bg-neutral rounded-xl flex justify-center shadow-xl" >
                <Confirm 
                    {documentRequest}
                    on:backToPageZero = {() => page = 0}
                    on:backToPageOne = {() => {
                        page = 1; 
                        // requirementsFiles = [];
                    }}
                    on:submit = {submitToDatabase}
                />
            </div>
        </div>
    {:else}
        <section>
            <RequestCompleted {requestId} />
        </section>
    {/if}
</div>

