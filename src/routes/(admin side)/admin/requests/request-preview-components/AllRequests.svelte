<script>
    import { db } from "$lib/firebase/client.js"
	import { doc, updateDoc } from "firebase/firestore";
    import {createEventDispatcher} from "svelte"

    export let allRequests;

    const dispatch = createEventDispatcher();
    let itemsPerPageCounter = 10;
    let currentPage = 1;
    let maxPage;

    function dispatchHandler(requestData) {
        if(!requestData.isViewed){
            updateDoc(doc(db, requestData.collectionReference, requestData.requestId), {
                isViewed: true
            })
        }
        dispatch("view", {
            requestData
        })
    }

    $: maxPage = (Math.ceil(allRequests.length / itemsPerPageCounter) > 0 ? Math.ceil(allRequests.length / itemsPerPageCounter) : 1)
</script>

<div class="w-full h-full">
    <div class="w-full flex justify-center gap-4 p-2 relative">
        <!-- <div class="absolute left-0 flex gap-2 items-center">
            <small>Items per page:</small>
            <select class="select select-bordered select-sm select-primary" bind:value={itemsPerPageCounter}>
                <option value=3 >3</option>
                <option value=5 >5</option>
                <option value=10 >10</option>
                <option value=20 >20</option>
            </select>
        </div> -->
        <button class="btn btn-circle btn-sm btn-primary group" on:click={()=>currentPage--} disabled={currentPage === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
        </button>
        <p>Page {currentPage}/{maxPage}</p>
        <button class="btn btn-circle btn-sm btn-primary group"  on:click={()=>currentPage++} disabled={currentPage === maxPage}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 font-bold">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
        </button>
    </div>
    <table class="table w-full">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Request ID</th>
                <th>Type of Request</th>
            </tr>
        </thead>
        <tbody >
            <!-- <div class=" overflow-auto max-h-[400px] "> -->
                {#each allRequests??[] as requestData, index}
                    {#if (index >= ((currentPage-1)*itemsPerPageCounter)) && (index < (currentPage*itemsPerPageCounter)) }
                        <tr class="hover" on:click={dispatchHandler(requestData)}>
                            <th class="indicator w-full h-full">
                                {#if requestData.status==="pending" && !requestData.isViewed}
                                    <span class="indicator-item indicator-center badge badge-error z-100">new</span>
                                {/if}
                                <p>{index+1}</p>
                            </th>
                            <td>{requestData.lastName}, {requestData.firstName} {requestData.middleName}</td>
                            <td>{requestData.requestId  }</td>
                            <td>{requestData.typeOfRequest  }</td>
                        </tr>
                    {/if}
                {/each}
            <!-- </div> -->
        </tbody>
    </table>
</div>
{#if allRequests?.length === 0}
    <p class="w-full h-[300px] flex items-center justify-center opacity-100">Nothing to show</p>
{/if}