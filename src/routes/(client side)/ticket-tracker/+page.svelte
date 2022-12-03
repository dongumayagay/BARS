<script>
    import { doc, getDoc } from 'firebase/firestore';
    import { db } from '$lib/firebase/client';
    import {goto} from "$app/navigation"
    import Tracker from "./Tracker.svelte";

    let errorMessage = "";

    async function submitHandler(event) {
        try {
            console.log(event.detail)
            const docRef = await getDoc(doc(db, event.detail.typeOfRequest, event.detail.requestId))

            if(!docRef.exists()){
                errorMessage = "This request does not exist, please try again"
                console.log(errorMessage)
            } else {
                errorMessage = "";
                // console.log("The request does exist")
                if(event.detail.typeOfRequest === 'documentRequests'){
                    goto('../document-request/' + event.detail.requestId);
                } else {
                    goto('../document-request/' + event.detail.requestId);
                }
            } 
             
        } catch (error) {
            console.log(error)
        }
    }
</script>

<svelte:head>
    <title>Request Tracker | B.A.R.S.</title>
</svelte:head>

<main class="p-4 lg:px-0 max-w-[100vw] flex justify-center">
    <Tracker {errorMessage} on:submit={submitHandler} />
</main>