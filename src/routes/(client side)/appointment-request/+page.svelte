<script>
    import DatePicker from "./DatePicker.svelte";
    import InfoForm from "$lib/components/InfoForm.svelte";
    import RequestCompleted from "$lib/components/RequestCompleted.svelte"; 
	import OfficialsList from "./OfficialsList.svelte";
	import ConfirmAppointment from "./ConfirmAppointment.svelte";
    import {db} from '$lib/firebase/client.js'
    import {addDoc, collection, Timestamp} from 'firebase/firestore';
    import { sendEmail } from '$lib/utils.js';

    let page = 0;
    let requestSubmitted = false;

    let appointmentRequest = [];
    let requestId;

    function nextHandler(event) {
        appointmentRequest = Object.assign(appointmentRequest, event.detail)
        page += 1;

        console.log(appointmentRequest, page);
    }

    async function emailRequestId(email, appointmentRequestId) {
		const result = await sendEmail({
			to: email,
			subject: 'Document Request Tracker',
			html: '<a href="https://bars-git-documents-request-page-dongumayagay.vercel.app/document-request/' + appointmentRequestId + '">Click Here</a>'
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
                dateAdded: Timestamp.now(),
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

</script>

{#if !requestSubmitted}
    <section class="p-3 flex flex-col items-center gap-4">
        <ul class="steps w-full lg:w-[75%]">
            <li class="step font-semibold {page != 0 ? 'text-black/50' : ''}" class:step-success={page >= 0} class:text-sm={page!==0}>Contact Info</li>
            <li class="step {page >= 1 ? "step-success font-semibold": ""} {page != 1 ? 'text-black/50' : ''}" class:text-sm={page!==1}>Pick date & time</li>
            <li class="step {page >= 2 ? "step-success font-semibold": ""} {page != 2 ? 'text-black/50' : ''}" class:text-sm={page!==2}>Select an official</li>
            <li class="step {page === 3 ? "step-success font-semibold": ""} {page != 3 ? 'text-black/50' : ''}" class:text-sm={page!==3}>Confirm</li>
        </ul>

        <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 0}>
            <InfoForm on:next={nextHandler}/>
        </div>

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
                    on:submit={submitToDatabase}
                />
            </div>
        </div>

    </section>

{:else}

    <section class="pt-4">
        <RequestCompleted {requestId} trackerPath='./appointment-request/'/>
    </section>

{/if}