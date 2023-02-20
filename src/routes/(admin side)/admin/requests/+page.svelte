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

    onMount(()=>{
        if(!$userStore){
            goto("../admin")
        }
    })

    $currentPage = 1;

    let page = 0;

    function navigate(event) {
        page = event.detail.index;
    }
</script>

<main class="w-full h-full flex flex-col items-center p-4 px-1 ">

	<div class="w-full h-full bg-neutral flex flex-col items-center pb-[5vh] rounded-b-lg">
        <DAHeader {page} on:switchTab={navigate}/>
		<div class="w-[90%] h-full bg-base-100 flex justify-center border-[1px] border-base-300 rounded-lg">
            <PendingList {page} />
            <DocumentsToClaim {page} />
            <ApprovedAppointments {page} />
            <ServedRequestsList {page} />
            <Trash {page} />
		</div>
	</div>
</main>