<script>
    import {createEventDispatcher} from "svelte";

    export let documentRequests;

    const dispatch = createEventDispatcher();

    function dispatchHandler(requestData) {
        dispatch("view", {
            requestData
        })
    }
</script>

<div class="w-full h-full">
    <table class="table w-full">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Request ID</th>
                <th>Documents Requested</th>
            </tr>
        </thead>
        <tbody>
            {#each documentRequests as requestData, index}
                <tr class="hover" on:click={dispatchHandler(requestData)}>
                    <th>{index+1}</th>
                    <td>{requestData.lastName}, {requestData.firstName} {requestData.middleName}</td>
                    <td>{requestData.requestId}</td>
                    <td class="flex flex-col gap-2">
                        {#each requestData.docsRequested as document}
                            <div class="flex gap-2 items-center">
                                <i class="fa-solid fa-circle text-[8px]"></i>
                                <p>{document.name}</p>
                            </div>
                        {/each}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
{#if documentRequests.length === 0}
    <p class="w-full h-[300px] flex items-center justify-center opacity-100">Nothing to show</p>
{/if}