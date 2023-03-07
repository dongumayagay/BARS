<script>
    import { userStore } from "$lib/stores.js";
    import { db, } from "$lib/firebase/client.js";
    import { Circle } from "svelte-loading-spinners";
    import { collection, getDocs, query, where } from "firebase/firestore";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    async function fetchRequestsHistory(){
        try {
            const documentRequestsRef = await getDocs(query(collection(db, "documentRequests"), where("email", "==", $userStore.email)))
            const appointmentRequestsRef = await getDocs(query(collection(db, "appointmentRequests"), where("email", "==", $userStore.email)))
            const documentRequests = documentRequestsRef.docs.map((doc)=>({
                fullName: doc.data().lastName + ", " + doc.data().firstName + " " + doc.data().middleName??"" + doc.data().suffix??"",
                requestId: doc.id,
                requestPath: "documentRequests",
                typeOfRequest: "Document Request",
            }))
            const appointmentRequests = appointmentRequestsRef.docs.map((doc)=>({
                fullName: doc.data().lastName + ", " + doc.data().firstName + " " + doc.data().middleName??"" + doc.data().suffix??"",
                requestId: doc.id,
                requestPath: "appointmentRequests",
                typeOfRequest: "Appointment Request",
            }))
            const allRequests = [...documentRequests, ...appointmentRequests] 
            console.log(allRequests)
            return allRequests;
        } catch (error) {
            alert(error.message)
        }
    }

</script>

<section class="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center z-20">
    <section class="w-[80%] h-[70%] bg-neutral flex flex-col gap-4 rounded-xl shadow-xl p-4">
        <section class="w-full flex justify-center p-6 relative">
            <p class="font-bold text-lg">Requests History</p>
            <button type="button" class="absolute left-0 top-0" on:click={()=>dispatch("close")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </section>
        <section class="overflow-auto w-full h-full flex flex-col justify-center items-center relative">
        {#await fetchRequestsHistory()}
            <Circle />
            <p>Loading Requests History</p>
        {:then allRequests} 
            <div class="sticky top-0 bg-neutral w-full grid grid-cols-3 border-b-2 border-accent p-2">
                <p class="justify-self-center font-semibold">Name</p>
                <p class="justify-self-center font-semibold">Request ID</p>
                <p class="justify-self-center font-semibold">Type of Request</p>
            </div>
            {#each allRequests as request}
            <button type="button" class="w-full grid grid-cols-3 p-6 border-b-2 hover:bg-primary" on:click={()=>dispatch("select", {
                requestId: request.requestId,
                requestPath: request.requestPath,
            })}>
                <p class="justify-self-center">{request.fullName}</p>
                <p class="justify-self-center">{request.requestId}</p>
                <p class="justify-self-center">{request.typeOfRequest}</p>
            </button>
            {/each}
        {/await}
        </section>
    </section>
</section>