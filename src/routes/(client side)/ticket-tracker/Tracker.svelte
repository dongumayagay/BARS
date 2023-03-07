<script>
    import {createEventDispatcher} from "svelte";
    import { userStore } from "$lib/stores.js";
    import { db, } from "$lib/firebase/client.js"
	import { Circle } from "svelte-loading-spinners";
	import { collection, getDocs, query, where } from "firebase/firestore";

    const dispatch = createEventDispatcher();

    export let errorMessage;

    let typeOfRequest;
    let requestId;

    let transactions = [];

    let showSignUpModal = false;
    let showTransactionsModal = false;

    function submitHandler() {
        dispatch("submit", {
            typeOfRequest,
            requestId
        })
    }

    function transactionViewerHandler(){
        if(!!$userStore){
            showTransactionsModal = true;
        } else {
            showSignUpModal = true;
        }
    }

    async function fetchRequestsHistory(){
        try {
            let allRequests
            const documentRequestsRef = await getDocs(query(collection(db, "documentRequests"), where("email", "==", $userStore.email)))
            const appointmentRequestsRef = await getDocs(query(collection(db, "appointmentRequests"), where("email", "==", $userStore.email)))
            const documentRequests = documentRequestsRef.docs.map((doc)=>({
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "documentRequests",
            }))
            const appointmentRequests = appointmentRequestsRef.docs.map((doc)=>({
                ...doc.data(),
                requestId: doc.id,
                typeOfRequest: "appointmentRequests",
            }))
            allRequests = [...documentRequests, ...appointmentRequests] 
            console.log(allRequests)
            return allRequests;
        } catch (error) {
            alert(error.message)
        }
    }


    console.log(errorMessage)
</script>


<form class="flex flex-col items-center justify-center w-full h-max lg:w-[75%] p-6 bg-neutral rounded-xl shadow-xl gap-4" on:submit|preventDefault={submitHandler}>
    <h1 class="text-md font-semibold">Track your requests here</h1>
    <div class="flex flex-col items-center w-full h-full">
        <p class="text-sm lg:text-md w-full text-center">Select what type of request are you looking for, then paste the id of that existing request</p>
        <div class="h-max py-10 flex flex-col items-center justify-start w-full gap-5">
            <div class="w-full lg:w-[60%] flex flex-col items-center gap-4">
                <div class="form-control w-full">
                    <div class="flex flex-col gap-2 lg:gap-0">
                        <div class="flex flex-col gap-2 lg:input-group lg:flex-row lg:gap-0">
                            <select name="requestSelector" id="requestSelector" class="w-full lg:w-[45%] select select-md border-secondary bg-primary focus:ring-0 focus:border-secondary focus:outline-primary" bind:value={typeOfRequest} required>
                                <option class="bg-neutral" disabled selected>Type of Request</option>
                                <option value="documentRequests" class="bg-neutral">Document Request</option>
                                <option value="appointmentRequests" class="bg-neutral">Appointment Request</option>
                            </select>
                            <input type="text" placeholder="Request ID" class="input input-secondary bg-neutral w-full focus:ring-0 focus:border-secondary focus:outline-primary" bind:value={requestId} maxlength="20" required>
                        </div>
                        <label class="label w-full flex justify-center h-max p-2" for="requestSelector" >
                            <span class="text-center lg:text-start text-md" class:block={errorMessage !== ""}>{errorMessage}</span>
                        </label>
                    </div>
                  </div>
            </div>
        </div>
        <div class="w-[60%] p-3 flex flex-col justify-center items-center">
            <button type="submit" class="btn btn-primary w-full hover:bg-primary">Confirm</button>
            <button type="reset" class="btn btn-ghost w-max hover:bg-neutral group"><p class=" group-hover:underline group-hover:underline-offset-4">Clear Inputs</p></button>
        </div>
        <section class="w-full flex justify-center lg:justify-start">
            <button type="button" class="btn btn-info btn-sm" on:click={transactionViewerHandler} disabled>
                See requests history
            </button>
        </section>
    </div>
    {#if showTransactionsModal}
        <section class="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center z-20">
            <section class="w-[80%] min-h-[70%] bg-neutral flex flex-col gap-4 rounded-xl shadow-xl">
                <section class="w-full flex justify-center p-6 relative">
                    <p class="font-bold text-lg">Requests History</p>
                    <button type="button" class="absolute left-6" on:click={()=>showTransactionsModal=false}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </section>
                <section class="w-full h-full flex justify-center items-center">
                {#await fetchRequestsHistory()}
                    <Circle color="#fff"/>
                    <p>Loading Requests History</p>
                {:then allRequests} 
                    {#each allRequests as request}
                        <p>{request.requestId}</p>
                    {/each}
                {/await}
                </section>
            </section>
        </section>
    {/if}
</form>