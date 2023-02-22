<script>
    import DAHeader from './DAHeader.svelte';
    import PendingList from './PendingList.svelte';
    import DocumentsToClaim from './DocumentsToClaim.svelte';
	import ApprovedAppointments from './ApprovedAppointments.svelte';
    import ServedRequestsList from './ServedRequestsList.svelte';
	import Trash from './Trash.svelte';
    import {goto} from '$app/navigation';
    import { userStore, currentPage } from '$lib/stores.js'
	import { onMount } from 'svelte';

    $currentPage = 1;

    let page = 0;

    let newAppointmentRequestsCounter = 0;
    let newDocumentRequestsCounter = 0;
    let newRequestsCounter

    let newMessages = [];

    onMount(()=>{
        if(!$userStore){
            goto("../admin")
        }

        newAppointmentRequestsCounter = 0;
        newDocumentRequestsCounter = 0;
        newMessages = [];
    })

    function navigate(event) {
        page = event.detail.index;
    }
    $: newRequestsCounter = newAppointmentRequestsCounter + newDocumentRequestsCounter
    $: console.log(newRequestsCounter)
</script>


<main class="w-full h-full flex flex-col items-center p-4 px-1 ">

	<div class="w-full h-screen bg-neutral flex flex-col items-center pb-[5vh] rounded-b-lg">
        <DAHeader {page} {newRequestsCounter} on:switchTab={navigate}/>
		<div class="w-[90%] h-full bg-base-100 flex justify-center border-[1px] border-base-300 rounded-lg">
            <PendingList {page} 
                on:newDocRequest={()=>newDocumentRequestsCounter++} 
                on:newAptRequest={()=>newAppointmentRequestsCounter++} 
                on:minusDocNotifCounter={()=>newDocumentRequestsCounter--}
                on:minusAptNotifCounter={()=>newAppointmentRequestsCounter--}
            />
            <DocumentsToClaim {page} />
            <ApprovedAppointments {page} />
            <ServedRequestsList {page} />
            <Trash {page} />
		</div>
	</div>
</main>