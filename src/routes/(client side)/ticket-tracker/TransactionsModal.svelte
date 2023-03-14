<script>
    import { userStore } from "$lib/stores.js";
    import { db, } from "$lib/firebase/client.js";
    import { Circle } from "svelte-loading-spinners";
    import { collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    async function fetchRequestsHistory(){
        try {
            const documentRequestsRef = await getDocs(query(collection(db, "documentRequests"), where("email", "==", $userStore.email), orderBy("lastUpdated", "desc")))
            const appointmentRequestsRef = await getDocs(query(collection(db, "appointmentRequests"), where("email", "==", $userStore.email), orderBy("lastUpdated", "desc")))
            const documentRequests = documentRequestsRef.docs.map((doc)=>({
                fullName: doc.data().lastName + ", " + doc.data().firstName + " " + doc.data().middleName??"" + doc.data().suffix??"",
                status: doc.data().status,
                lastUpdated: doc.data().lastUpdated,
                requestId: doc.id,
                requestPath: "documentRequests",
                typeOfRequest: "Document Request",
            }))
            const appointmentRequests = appointmentRequestsRef.docs.map((doc)=>({
                fullName: doc.data().lastName + ", " + doc.data().firstName + " " + doc.data().middleName??"" + doc.data().suffix??"",
                status: doc.data().status,
                lastUpdated: doc.data().lastUpdated,
                requestId: doc.id,
                requestPath: "appointmentRequests",
                typeOfRequest: "Appointment Request",
            }))
            const allRequests = [...documentRequests, ...appointmentRequests] 
            console.log(allRequests)
            return allRequests;
        } catch (error) {
            console.log(error.message)
        }
    }

</script>

<section class="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center z-20">
    <section class="w-[95%] h-[70%] bg-neutral flex flex-col gap-4 rounded-xl shadow-xl p-4">
        <section class="w-full flex justify-center p-6 relative">
            <p class="font-bold text-lg">Requests History</p>
            <button type="button" class="absolute left-0 top-0" on:click={()=>dispatch("close")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </section>
        <section class="overflow-auto w-full h-full flex flex-col justify-center items-center px-2 lg:px-0">
            {#await fetchRequestsHistory()}
                <Circle />
                <p>Loading Requests History</p>
            {:then allRequests} 
                <div class="overflow-auto hidden w-full h-full relative lg:block">
                    <div class="sticky top-0 bg-neutral w-full grid grid-cols-5 border-b-2 border-accent p-2">
                        <p class="justify-self-center font-semibold">Name</p>
                        <p class="justify-self-center font-semibold">Request ID</p>
                        <p class="justify-self-center font-semibold">Type of Request</p>
                        <p class="justify-self-center font-semibold">Last Updated</p>
                        <p class="justify-self-center font-semibold">Status</p>
                    </div>
                    {#if allRequests.length > 0}
                        {#each allRequests as request}
                            <button type="button" class="w-full grid grid-cols-5 p-6 border-b-2 hover:bg-primary" on:click={()=>dispatch("select", {
                                requestId: request.requestId,
                                requestPath: request.requestPath,
                            })}>
                                <p class="justify-self-center font-bold">{request.fullName}</p>
                                <p class="justify-self-center">{request.requestId}</p>
                                <p class="justify-self-center">{request.typeOfRequest}</p>
                                <p class="justify-self-center">{new Timestamp(request.lastUpdated.seconds, request.lastUpdated.nanoseconds).toDate().toString().split("GMT")[0]}</p>
                                <p class="justify-self-center"
                                    class:font-semibold={request.status == "pending"} 
                                    class:text-info={request.status === "Ready to claim" || request.status === "Approved"}
                                    class:text-success={request.status === "Request Completed" || request.status === "Appointment Served"}
                                >{request.status}</p>
                            </button>
                        {/each}
                    {:else}
                        <section class="w-full h-full flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <p class="font-semibold">Nothing to show</p>
                        </section>
                    {/if}
                </div>
                <div class="overflow-auto lg:hidden block w-full {allRequests.length > 0 ? "border-t-2 border-accent" : ""}">
                    {#if allRequests.length > 0}
                        {#each allRequests as request}
                            <button class="w-full flex flex-col gap-2 border-b-2 p-2" on:click={()=>dispatch("select", {
                                requestId: request.requestId,
                                requestPath: request.requestPath,
                            })}>
                                <small class="w-full text-center font-light">Last Updated: {new Timestamp(request.lastUpdated.seconds, request.lastUpdated.nanoseconds).toDate().toString().split("GMT")[0]}</small>
                                <div class="w-full flex gap-1">
                                    <div class="w-full flex flex-col gap-2 items-center">
                                        <p class="text-center font-bold">{request.fullName}</p>
                                        <small>{request.requestId}</small>
                                    </div>
                                    <div class="w-full flex flex-col gap-2 items-center">
                                        <p class="text-center">{request.typeOfRequest}</p>
                                        <small 
                                            class:font-semibold={request.status == "pending"} 
                                            class:text-info={request.status === "Ready to claim" || request.status === "Approved"}
                                            class:text-success={request.status === "Request Completed" || request.status === "Appointment Served"}
                                        >{request.status}</small>
                                    </div>
                                </div>
                            </button>
                        {/each}
                    {:else}
                        <section class="w-full h-full flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-14 h-14">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                            <p class="font-semibold">Nothing to show</p>
                        </section>
                    {/if}
                </div>
            {/await}
        </section>
    </section>
</section>