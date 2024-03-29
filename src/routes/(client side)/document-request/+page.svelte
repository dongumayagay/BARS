<script>
    import { currentPage, userStore } from "$lib/stores.js";
    import { db,  storage } from "$lib/firebase/client.js";
    import { Timestamp, collection, addDoc} from "firebase/firestore";
    import { ref, uploadBytes } from "firebase/storage";
    import { sendEmail } from '$lib/utils';
    import { Circle } from "svelte-loading-spinners";
    import DocumentsList from "./DocumentsList.svelte";
    import PurposeSelector from "./PurposeSelector.svelte";
    import FileUpload from "./FileUpload.svelte";
    import Confirm from "./Confirm.svelte";
    import RequestModeSelector from "./RequestModeSelector.svelte";
    import InfoForm from "$lib/components/BasicInformationForm.svelte";
    import RequestCompleted from "$lib/components/RequestCompleted.svelte";
	import Otp from "$lib/components/OTP.svelte";
	import DataPrivacyConsent from "$lib/components/DataPrivacyConsent.svelte";
	import MinorsForm from "./Minor'sForm.svelte";

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

    let showLoadingScreen = false;
    let loadingStatement;

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
            showLoadingScreen = true;
            loadingStatement = "Uploading Your Request..."
            console.log("uploading...")
            const documentRequestRef = await addDoc(collection(db, 'documentRequests'),{
                lastName: documentRequest.contactInfo.lastName,
                firstName: documentRequest.contactInfo.firstName,
                middleName: documentRequest.contactInfo.middleName??"",
                suffix: documentRequest.contactInfo.suffix??"",
                completeAddress: documentRequest.contactInfo.address,
                contactNo: documentRequest.contactInfo.contactNo,
                birthDate: documentRequest.contactInfo.birthdate,
                email: documentRequest.contactInfo.email,
                isViewed: false,
                dateAdded: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                docsRequested: documentRequest.listOfRequestedDocuments,
                multiPurpose: documentRequest.multiPurpose,
                docPurpose: documentRequest.selectedPurpose??"",
                totalFee: documentRequest.totalFee,
                status: "pending",
                guardianInfo: documentRequest.guardianInfo??"",
                authorizedRequestor: documentRequest.authorizedRequestor??"",
                civilStatus: documentRequest.contactInfo.civilStatus,
                nationality: documentRequest.contactInfo.nationality,
                requestorUID: $userStore?.uid??"",
            })
            if(!!documentRequestRef) console.log("uploaded request")
            loadingStatement = "Uploading Files..."
            const fileUploadPromises = documentRequest.filesToUpload.map((value)=>{
                const pathName = "documentRequestsFiles/" + documentRequestRef.id + "/" + value.requestedDocumentName + "/" + value.requirementName + ".jpg"
                const storageReference =  ref(storage, pathName);
                
                return uploadBytes(storageReference, value.file[0]);
            })
            loadingStatement = "Generating Ticket Id..."
            
            const fileUploadPromisesResult = await Promise.all(fileUploadPromises)
            loadingStatement = "Sending Ticket ID to your email..."
            emailRequestId(documentRequest.contactInfo.email, documentRequestRef.id);
            requestId = documentRequestRef.id;
            loadingStatement = "Cleaning Up..."
            if(!!documentRequestRef && !!fileUploadPromisesResult){
                requestComplete = true;
                showLoadingScreen = false;    
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
        if(page === 1){
            if(!!$userStore){
                if(event.detail.contactInfo.email !== $userStore.email){showOTPModal = true}
                if(event.detail.contactInfo.email === $userStore.email){page++}
                // return 0;
            }
            if(!$userStore){
                if(!emailVerified || verifiedEmail !== event.detail.contactInfo.email){
                    showOTPModal = true;
                }
            }
        }else{
            page ++;
        }
        console.log(documentRequest)
        // && ((!emailVerified || verifiedEmail !== event.detail.contactInfo.email) || (!$userStore || (event.detail.contactInfo.email !== $userStore.email))) 
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

{#if !requestComplete}
    <div class="p-3 flex flex-col items-center gap-4">
    
        <RequestModeSelector {page} on:next={nextHandler}/>
        <ul class="steps lg:w-[75%]" class:hidden={page===0}>
            <li class="step font-semibold" class:step-success={page >= 0} class:text-xs={page!==1}>Contact Info</li>
            <li class="step {page >= 2 ? "step-success font-semibold": ""}" class:text-xs={page!==2}>Documents to Request</li>
            <li class="step {page >= 3 ? "step-success font-semibold": ""}" class:text-xs={page!==3}>Select Purpose</li>
            <li class="step {page >= 4 ? "step-success font-semibold": ""}" class:text-xs={page!==4}>Upload Requirements</li>
            <li class="step {page === 5 ? "step-success font-semibold": ""}" class:text-xs={page!==5}>Confirm</li>
        </ul>
        {#if documentRequest.isRequestForSomeone !== undefined}
        <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 1}>
            <button class="btn btn-ghost hover:bg-transparent" on:click={()=>{documentRequest.isRequestForSomeone = undefined; page--;}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <p>Go Back</p>
            </button>
            <InfoForm on:next={nextHandler} isDocumentRequest={true} isRequestForSomeone={documentRequest.isRequestForSomeone}/>
        </div>
        {/if}
        {#if documentRequest.minor}
        <div class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 1}>
            <button class="btn btn-ghost hover:bg-transparent" on:click={()=>{documentRequest.minor = undefined; page--;}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <p>Go Back</p>
            </button>
            <MinorsForm on:next={nextHandler} isDocumentRequest={true} isRequestForSomeone={documentRequest.isRequestForSomeone}/>
        </div>  
        {/if}
        {#if showOTPModal}
        <Otp email={documentRequest.contactInfo?.email??""} on:emailVerified={emailVerifier} on:close={()=>showOTPModal=false}/>
            
        {/if}

        <div class="w-[95%] lg:w-[45%] p-4 bg-neutral rounded-xl flex justify-start shadow-xl" class:hidden={page !== 2}>
            <DocumentsList on:next={nextHandler} on:back={()=>page -= 1 }/>
        </div>
        
        <div class="w-[95%] lg:w-[45%] p-4 bg-neutral rounded-xl flex justify-start shadow-xl" class:hidden={page !== 3}>
            <PurposeSelector listOfRequestedDocuments={documentRequest.listOfRequestedDocuments} on:next={nextHandler} on:back={()=>page -= 1 }/>
        </div>

        <div class="w-[95%] lg:w-[45%] p-4 lg:px-6 bg-neutral rounded-xl flex justify-center shadow-xl" class:hidden={page !== 4}>
            <FileUpload listOfRequestedDocuments={documentRequest?.listOfRequestedDocuments??[]} isRequestForSomeone={documentRequest.isRequestForSomeone} guardianInfo={documentRequest.guardianInfo} on:next={nextHandler} on:back={()=>page -= 1 }/>
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
        {#if showLoadingScreen}
            <section class="fixed top-0 left-0 bg-black/70 w-screen h-screen flex flex-col justify-center items-center gap-2 rounded-xl">
                <Circle color="#fff"/>
                <p class="text-white">{loadingStatement}</p>
            </section>
        {/if}
    </div>
{:else}
    <section class="p-4 lg:px-0 lg:pb-0">
        <RequestCompleted {requestId} trackerPath='./document-request/'/>
    </section>
{/if}

