<script>
    import DatePicker from "./DatePicker.svelte";
    import InfoForm from "$lib/components/BasicInformationForm.svelte";
    import RequestCompleted from "$lib/components/RequestCompleted.svelte"; 
	import OfficialsList from "./OfficialsList.svelte";
	import ConfirmAppointment from "./ConfirmAppointment.svelte";
    import Otp from "$lib/components/OTP.svelte";
    import DataPrivacyConsent from "$lib/components/DataPrivacyConsent.svelte";
    import {db} from '$lib/firebase/client.js'
    import {addDoc, collection, Timestamp} from 'firebase/firestore';
    import { sendEmail } from '$lib/utils.js';
    import { currentPage } from "$lib/stores.js";
 
    $currentPage = 2;

    let page = 0;
    let appointmentRequest = [];
    let requestSubmitted = false;
    let requestId;
    let verifiedEmail;
    let emailVerified = false;
    let showOTPModal = false;
    let showConsentModal = false;
    let consentAgreed = false;

    function nextHandler(event) {
        appointmentRequest = Object.assign(appointmentRequest, event.detail)
        if(page === 0 && (!emailVerified || verifiedEmail !== event.detail.contactInfo.email)){
            showOTPModal = true;
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

    function consentChecker(){
        (consentAgreed) ? submitToDatabase() : showConsentModal = true;
    }

    async function emailRequestId(email, appointmentRequestId) {
		const result = await sendEmail({
			to: email,
			subject: 'Appointment Request Tracker',
			html: '<a href="https://bars-gf.vercel.app/appointment-request/' + appointmentRequestId + '">Click Here</a><p> to track this appointment request</p>'
		});

        console.log(JSON.stringify(result))
        alert("An email containing this request's tracker link has been sent");
	}

    async function submitToDatabase() {
        try {
            const appointmentRequestRef = await addDoc(collection(db, 'appointmentRequests'),{
                lastName: appointmentRequest.contactInfo.lastName,
                firstName: appointmentRequest.contactInfo.firstName,
                middleName: appointmentRequest.contactInfo.middleName,
                completeAddress: appointmentRequest.contactInfo.address,
                contactNo: appointmentRequest.contactInfo.contactNo,
                birthDate: appointmentRequest.contactInfo.birthdate,
                email: appointmentRequest.contactInfo.email,
                isViewed: false,
                dateAdded: Timestamp.now(),
                lastUpdated: Timestamp.now(),
                appointmentDate: appointmentRequest.selectedDateAndTime.date,
                appointmentTime: appointmentRequest.selectedDateAndTime.time,
                appointmentPurpose: appointmentRequest.contactInfo.purpose,
                selectedOfficial: appointmentRequest.selectedOfficial,
                status: "pending"
            })

            emailRequestId(appointmentRequest.contactInfo.email, appointmentRequestRef.id);
            requestId = appointmentRequestRef.id;
            alert('Your request for an appointment has been submitted\n\nRequest ID: ' + appointmentRequestRef.id);
            requestSubmitted = true; 
        } catch (error) {
            console.log(error)
        }
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
    <title>Appointment Request | B.A.R.S.</title>
</svelte:head>

{#if !requestSubmitted}
    <section class="p-3 flex flex-col items-center gap-4">
        <ul class="steps w-full lg:w-[75%]">
            <li class="step font-semibold {page != 0 ? 'text-black/50' : ''}" class:step-success={page >= 0} class:text-sm={page!==0}>Contact Info</li>
            <li class="step {page >= 1 ? "step-success font-semibold": ""}" class:text-sm={page!==1}>Pick date & time</li>
            <li class="step {page >= 2 ? "step-success font-semibold": ""}" class:text-sm={page!==2}>Select an official</li>
            <li class="step {page === 3 ? "step-success font-semibold": ""}" class:text-sm={page!==3}>Confirm</li>
        </ul>

        <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 0}>
            <InfoForm on:next={nextHandler} isDocumentRequest={false}/>
        </div>
        <Otp email={appointmentRequest.contactInfo?.email??""} {showOTPModal} on:emailVerified={emailVerifier} on:close={()=>showOTPModal=false}/>

        <div class="w-[95%] lg:w-max p-4 bg-neutral rounded-xl shadow-xl" class:hidden={page !== 1}>
            <DatePicker on:next={nextHandler} on:back={()=>{page -= 1}}/>
        </div>

        <div class="w-[95%] lg:w-max p-4 bg-neutral rounded-xl shadow-xl" class:hidden={page !== 2}>
            <OfficialsList on:next={nextHandler} on:back={()=>{page -= 1}}/>
        </div>

        <div class="w-full flex justify-center" class:hidden={page !== 3}>
            <div class="w-[95%] lg:w-max p-4 lg:px-6 bg-neutral rounded-xl flex justify-center shadow-xl" >
                <ConfirmAppointment 
                    {appointmentRequest}
                    on:back={()=>{page -= 1}}
                    on:submit={consentChecker}
                />
            </div>
        </div>
        {#if showConsentModal}
            <DataPrivacyConsent on:decline={()=>showConsentModal = false} on:agree={()=>{
                consentAgreed = true;
                showConsentModal = false;
            }} />
        {/if}
    </section>

{:else}

    <section class="pt-4">
        <RequestCompleted {requestId} trackerPath='./appointment-request/'/>
    </section>

{/if}