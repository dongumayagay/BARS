<script>
    import DAHeader from './DAHeader.svelte';
    import PendingList from './PendingList.svelte';
    import DocumentsToClaim from './DocumentsToClaim.svelte';
	import ApprovedAppointments from './ApprovedAppointments.svelte';
	import RequestsHistory from './RequestsHistory.svelte';
	import Trash from './Trash.svelte';
    import {goto} from '$app/navigation';
    import { userStore, currentPage } from '$lib/stores.js'
	import { onMount } from 'svelte';

    onMount(()=>{
        if(!$userStore){
            $currentPage = 1;
            goto("../admin")
        }
    })

    let page = 0;

    function navigate(event) {
        page = event.detail.index;
    }
</script>

<main class="w-full flex flex-col items-center p-4 px-1">
	<DAHeader {page} on:switchTab={navigate}/>

	<div class="w-full bg-neutral min-h-screen flex justify-center pb-[5vh]">
		<div class="w-[90%] bg-base-100 flex justify-center border-[1px] border-base-300 rounded-lg">
            <PendingList {page} />
            <DocumentsToClaim {page} />
            <ApprovedAppointments {page} />
            <RequestsHistory {page} />
            <Trash {page} />
		</div>
	</div>
</main>