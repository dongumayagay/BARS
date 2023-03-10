<script>
    import {createEventDispatcher} from "svelte";
    import { userStore } from "$lib/stores.js";
    import { db, } from "$lib/firebase/client.js"
	import { Circle } from "svelte-loading-spinners";
	import { collection, getDocs, query, where } from "firebase/firestore";
	import TransactionsModal from "./TransactionsModal.svelte";

    const dispatch = createEventDispatcher();

    export let errorMessage;

    let requestPath;
    let requestId;

    let transactions = [];

    let showSignUpModal = false;
    let showTransactionsModal = false;

    function submitHandler() {
        dispatch("submit", {
            requestPath,
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
                requestPath: "documentRequests",
                typeOfRequest: "Document Request",
            }))
            const appointmentRequests = appointmentRequestsRef.docs.map((doc)=>({
                ...doc.data(),
                requestId: doc.id,
                requestPath: "appointmentRequests",
                typeOfRequest: "Appointment Request",
            }))
            allRequests = [...documentRequests, ...appointmentRequests] 
            console.log(allRequests)
            return allRequests;
        } catch (error) {
            alert(error.message)
        }
    }

    function selectHandler(event){
        showTransactionsModal = false;
        dispatch("submit", {
            requestPath: event.detail.requestPath,
            requestId: event.detail.requestId
        })
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
                            <select name="requestSelector" id="requestSelector" class="w-full lg:w-[45%] select select-md border-secondary bg-primary focus:ring-0 focus:border-secondary focus:outline-primary" bind:value={requestPath} required>
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
            <button type="button" class="btn btn-info btn-sm" on:click={transactionViewerHandler} disabled={$userStore === null}>
                See requests history
            </button>
        </section>
    </div>
    {#if showTransactionsModal}
        <TransactionsModal on:close={()=>showTransactionsModal = false} on:select={selectHandler}/>
    {/if}
</form>