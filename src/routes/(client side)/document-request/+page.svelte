<script>
    import InfoForm from "$lib/components/BasicInformationForm.svelte";
    import DocumentsList from "./DocumentsList.svelte";
    import FileUpload from "./FileUpload.svelte";
    import Confirm from "./Confirm.svelte";
    import RequestCompleted from "$lib/components/RequestCompleted.svelte";
    import { currentPage } from "$lib/stores.js";
    import { db,  storage } from "$lib/firebase/client.js";
    import { Timestamp, collection, addDoc} from "firebase/firestore";
    import { ref, uploadBytes } from "firebase/storage";
    import { sendEmail } from '$lib/utils';
    // import RequestModeSelector from "./RequestModeSelector.svelte";
	import Otp from "./OTP.svelte";
	import DataPrivacyConsent from "./DataPrivacyConsent.svelte";

    $currentPage = 1;

    let page = 0;
    let documentRequest = {};
    let emailVerified = false;
    let verifiedEmail;
    let requestComplete = false;
    let requestId;
    let showOTPModal = false;
    let showConsentModal = false;
    let consentAgreed = false;

    function nextHandler(event) {
        documentRequest = Object.assign(documentRequest, event.detail)
        if(page === 1 && (!emailVerified || verifiedEmail !== event.detail.contactInfo.email)){
            showOTPModal = true;
        }else if(page === 2 && !documentRequest.onlineRequest){
            page += 2;
        }else{
            page += 1;
        }
        console.log(event.detail, page)
    }

    function emailVerifier(event){
        emailVerified =  true;
        verifiedEmail = event.detail;
        showOTPModal = false;
        alert("Your Email has been verified")
        page += 1;
    }

    async function emailRequestId(email, documentRequestId) {
		const result = await sendEmail({
			to: email,
			subject: 'Document Request Tracker',
			html: '<a href="https://bars-gf.vercel.app/document-request/' + documentRequestId + '">Click Here</a><p> to track this document request</p>'
		});

        console.log(JSON.stringify(result))
        alert("An email containing this request's tracker link has been sent");
	}
    
    // $: console.log(documentRequest)
    async function submitToDatabase(){
        try {

            const documentRequestRef = await addDoc(collection(db, 'documentRequests'),{
                onlineRequest: documentRequest.onlineRequest,
                lastName: documentRequest.contactInfo.lastName,
                firstName: documentRequest.contactInfo.firstName,
                middleName: documentRequest.contactInfo.middleName,
                completeAddress: documentRequest.contactInfo.address,
                contactNo: documentRequest.contactInfo.contactNo,
                birthDate: documentRequest.contactInfo.birthdate,
                email: documentRequest.contactInfo.email,
                dateAdded: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                docsRequested: documentRequest.listOfRequestedDocuments,
                docPurpose: documentRequest.contactInfo.purpose,
                totalFee: documentRequest.totalFee,
                status: "pending"
            })
            const fileUploadPromises = documentRequest.filesToUpload.map((value)=>{
                const pathName = "documentRequestsFiles/" + documentRequestRef.id + "/" + value.requestedDocumentName + "/" + value.requirementName + ".jpg"
                const storageReference =  ref(storage, pathName);
                
                return uploadBytes(storageReference, value.file[0]);
            })
            
            const fileUploadPromisesResult = await Promise.all(fileUploadPromises)
            emailRequestId(documentRequest.contactInfo.email, documentRequestRef.id);
            requestId = documentRequestRef.id;
            if(!!documentRequestRef && !!fileUploadPromisesResult){
                requestComplete = true;
            } 
            console.log(documentRequestRef.id)
        } catch (error) {
            const errorMessage = error.message;
        }
    }

    function consentChecker(){
        (consentAgreed) ? submitToDatabase() : showConsentModal = true;
    }

    function beforeUnload(event) {
        // Cancel the event as stated by the standard.
        event.preventDefault();
        // Chrome requires returnValue to be set.
        event.returnValue = '';
        // more compatibility
        return '...';
    }
</script>
<svelte:window on:beforeunload={beforeUnload}/>

<svelte:head>
    <title>Document Request | B.A.R.S.</title>
</svelte:head>

<div class="p-3 flex flex-col items-center gap-4">
    
    {#if !requestComplete}
    <ul class="steps lg:w-[75%]">
        <li class="step font-semibold" class:step-success={page >= 0} class:text-xs={page!==0}>Contact Info</li>
        <li class="step {page >= 1 ? "step-success font-semibold": ""}" class:text-xs={page!==1}>Documents to Request</li>
        <li class="step {page >= 2 ? "step-success font-semibold": ""}" class:text-xs={page!==2}>Upload Requirements</li>
        <li class="step {page === 3 ? "step-success font-semibold": ""}" class:text-xs={page!==3}>Confirm</li>
    </ul>
    
    <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 0}>
        <InfoForm on:next={nextHandler}/>
    </div>
    <Otp email={documentRequest.contactInfo?.email??""} {showOTPModal} on:emailVerified={emailVerifier} on:close={()=>showOTPModal=false}/>
    
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
                on:back={()=>page -= 1}
                on:submit = {consentChecker}
            />
        </div>
    </div>
    {#if showConsentModal}
        <DataPrivacyConsent on:decline={()=>showConsentModal = false} on:agree={()=>{
            consentAgreed = true;
            showConsentModal = false;
        }} />
    {/if}
    {:else}
        <section>
            <RequestCompleted {requestId} trackerPath='./document-request/'/>
        </section>
    {/if}
</div>

