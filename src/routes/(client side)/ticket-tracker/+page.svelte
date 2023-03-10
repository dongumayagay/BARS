<script>
    import { doc, getDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/client';
    import {goto} from "$app/navigation"
    import { currentPage, userStore } from "$lib/stores.js";
    import Tracker from "./Tracker.svelte";
	import { onMount } from 'svelte';

    $currentPage = 3;

    let userDetails = {};

    onMount(async ()=>{
        if(!!$userStore){
            const userRef = await getDoc(doc(db, "users", $userStore.uid));
            userDetails = {...userRef.data()}
        }
    })

    let errorMessage = "";

    async function submitHandler(event) {
        try {
            // console.log(event.detail)
            const docRef = await getDoc(doc(db, event.detail.requestPath, event.detail.requestId))

            if(!docRef.exists()){
                errorMessage = "This request does not exist, please try again"
                console.log(errorMessage)
            } else {
                errorMessage = "";
                if(event.detail.requestPath === 'documentRequests'){
                    goto('../document-request/' + event.detail.requestId);
                } else {
                    goto('../appointment-request/' + event.detail.requestId);
                }
            } 
             
        } catch (error) {
            console.log(error)
        }
    }

    $: console.log(userDetails)
</script>

<svelte:head>
    <title>Request Tracker | B.A.R.S.</title>
</svelte:head>

<main class="p-4 lg:px-0 max-w-[100vw] flex justify-center">
    <Tracker {errorMessage} on:submit={submitHandler} />
</main>