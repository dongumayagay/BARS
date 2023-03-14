<script>
    import { doc, getDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/client';
    import {goto} from "$app/navigation"
    import { currentPage, userStore } from "$lib/stores.js";
    import Tracker from "./Tracker.svelte";
	import { onMount } from 'svelte';
    import { Circle } from 'svelte-loading-spinners';

    $currentPage = 3;

    let userDetails = {};

    let showLoadingScreen = false;

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
            showLoadingScreen = true;
            const docRef = await getDoc(doc(db, event.detail.requestPath, event.detail.requestId))

            if(!docRef.exists()){
                errorMessage = "This request does not exist, please try again"
                alert(errorMessage)
                showLoadingScreen = false;
            } else {
                errorMessage = "";
                if(event.detail.requestPath === 'documentRequests'){
                    goto('../document-request/' + event.detail.requestId);
                } else {
                    goto('../appointment-request/' + event.detail.requestId);
                }
                showLoadingScreen = false;
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
    
    {#if showLoadingScreen}
        <section class="fixed top-0 left-0 bg-black/70 w-screen h-screen flex flex-col justify-center items-center gap-2 rounded-xl">
            <Circle color="#fff"/>
            <p class="text-white">Fetching you request data...</p>
        </section>
    {/if}
</main>