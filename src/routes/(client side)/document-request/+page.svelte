<script>
    import { currentPage, userStore } from "$lib/stores.js";
    import { db,  storage } from "$lib/firebase/client.js";
    import { Timestamp, collection, addDoc} from "firebase/firestore";
    import { ref, uploadBytes } from "firebase/storage";
    import { sendEmail } from '$lib/utils';
    import DocumentsList from "./DocumentsList.svelte";
    import PurposeSelector from "./PurposeSelector.svelte";
    import FileUpload from "./FileUpload.svelte";
    import Confirm from "./Confirm.svelte";
    import RequestModeSelector from "./RequestModeSelector.svelte";
    import InfoForm from "$lib/components/BasicInformationForm.svelte";
    import RequestCompleted from "$lib/components/RequestCompleted.svelte";
	import Otp from "$lib/components/OTP.svelte";
	import DataPrivacyConsent from "$lib/components/DataPrivacyConsent.svelte";

    $currentPage = 1;

    let page = 0;
    let documentRequest = {};
    let verifiedEmail;
    let requestId;
    let showOTPModal = false;
    let emailVerified = false;
    let showConsentModal = false;
    let consentAgreed = false;
    let requestComplete = false;

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
            console.log("uploading...")
            const documentRequestRef = await addDoc(collection(db, 'documentRequests'),{
                lastName: documentRequest.contactInfo.lastName,
                firstName: documentRequest.contactInfo.firstName,
                middleName: documentRequest.contactInfo.middleName,
                completeAddress: documentRequest.contactInfo.address,
                contactNo: documentRequest.contactInfo.contactNo,
                birthDate: documentRequest.contactInfo.birthdate,
                email: documentRequest.contactInfo.email,
                isViewed: false,
                dateAdded: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                docsRequested: documentRequest.listOfRequestedDocuments,
                docPurpose: documentRequest.selectedPurpose,
                totalFee: documentRequest.totalFee,
                status: "pending"
            })
            if(!!documentRequestRef) console.log("uploaded request")
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
            console.log(error.message)
        }
    }

    function nextHandler(event) {
        documentRequest = Object.assign(documentRequest, event.detail)
        // console.log((event.detail.contactInfo?.email??"" !== $userStore.email))
        if(page === 1 && (!emailVerified || verifiedEmail !== event.detail.contactInfo.email)){
            showOTPModal = true;
        }else{
            page += 1;
        }
        console.log(documentRequest)
    }

    function consentChecker(){
        if(consentAgreed){ submitToDatabase()} else { showConsentModal = true};
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
    <RequestModeSelector {page} on:next={nextHandler}/>
    <ul class="steps lg:w-[75%]" class:hidden={page===0}>
        <li class="step font-semibold" class:step-success={page >= 0} class:text-xs={page!==1}>Contact Info</li>
        <li class="step {page >= 2 ? "step-success font-semibold": ""}" class:text-xs={page!==2}>Select Purpose</li>
        <li class="step {page >= 3 ? "step-success font-semibold": ""}" class:text-xs={page!==3}>Documents to Request</li>
        <li class="step {page >= 4 ? "step-success font-semibold": ""}" class:text-xs={page!==4}>Upload Requirements</li>
        <li class="step {page === 5 ? "step-success font-semibold": ""}" class:text-xs={page!==5}>Confirm</li>
    </ul>
    {#if documentRequest.isRequestForSomeone !== undefined}
    <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 1}>
        <InfoForm on:next={nextHandler} isDocumentRequest={true} isRequestForSomeone={documentRequest.isRequestForSomeone}/>
    </div>
    {/if}
    <Otp email={documentRequest.contactInfo?.email??""} {showOTPModal} on:emailVerified={emailVerifier} on:close={()=>showOTPModal=false}/>
    
    <div class="w-[95%] lg:w-[45%] p-4 bg-neutral rounded-xl flex justify-start shadow-xl" class:hidden={page !== 2}>
        <PurposeSelector on:next={nextHandler} on:back={()=>page -= 1 }/>
    </div>

    <div class="w-[95%] lg:w-[45%] p-4 bg-neutral rounded-xl flex justify-start shadow-xl" class:hidden={page !== 3}>
        <DocumentsList on:next={nextHandler} on:back={()=>page -= 1 }/>
    </div>

    <div class="w-[95%] lg:w-[45%] p-4 lg:px-6 bg-neutral rounded-xl flex justify-center shadow-xl" class:hidden={page !== 4}>
        <FileUpload listOfRequestedDocuments={documentRequest?.listOfRequestedDocuments??[]} isRequestForSomeone={documentRequest.isRequestForSomeone} on:next={nextHandler} on:back={()=>page -= 1 }/>
    </div>

    <div class:hidden={page !== 5}>
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

