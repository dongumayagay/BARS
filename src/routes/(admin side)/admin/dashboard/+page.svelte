<script>
    import { userStore, currentPage } from '$lib/stores.js'
    import {goto} from '$app/navigation';
    import { onMount } from "svelte";
	import { collection, onSnapshot, query, Timestamp } from 'firebase/firestore';
    import { db } from "$lib/firebase/client.js"
	import DocumentRequests from './DocumentRequests.svelte';
	import AppointmentRequests from './AppointmentRequests.svelte';

    // $: 
    onMount(()=>{   
        if(!$userStore){
            goto("../admin")
        }
        const documentRequestsUnsub = onSnapshot(collection(db, "documentRequests"), (querySnapshot)=>{
            documentRequests = querySnapshot.docs.map((doc)=>({
                dateAddedMillis: new Timestamp(doc.data().dateAdded.seconds, doc.data().dateAdded.nanoseconds).toMillis(), 
                dateAdded: doc.data().dateAdded,
                status: doc.data().status,
                lastUpdated: new Timestamp(doc.data().lastUpdated.seconds, doc.data().lastUpdated.nanoseconds)
            }))
        })

        const appointmentRequestsUnsub = onSnapshot(collection(db, "appointmentRequests"), (querySnapshot)=>{
            appointmentRequests = querySnapshot.docs.map((doc)=>({
                dateAddedMillis: new Timestamp(doc.data().dateAdded.seconds, doc.data().dateAdded.nanoseconds).toMillis(), 
                dateAdded: doc.data().dateAdded,
                status: doc.data().status,
                lastUpdated: new Timestamp(doc.data().lastUpdated.seconds, doc.data().lastUpdated.nanoseconds)
            }))
        })
    })

    $currentPage = 0;

    let documentRequests = [];
    let appointmentRequests = [];
    
</script>

<main class="w-full h-full flex flex-col items-center p-4 px-1 ">
    <div class="w-full h-max min-h-screen bg-neutral flex flex-col items-center p-[5vh] rounded-xl shadow-xl">
        <!-- <div class="w-[90%] h-max min-h-[100vh] bg-base-100 flex justify-center border-[1px] border-base-300 rounded-lg">
            
        </div> -->
        <DocumentRequests {documentRequests}/>
        <AppointmentRequests {appointmentRequests}/>
    </div>
</main>



