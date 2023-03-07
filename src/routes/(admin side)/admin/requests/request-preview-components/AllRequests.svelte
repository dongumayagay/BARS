<script>
    import {createEventDispatcher} from "svelte"

    export let allRequests;

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
                <th>Type of Request</th>
            </tr>
        </thead>
        <tbody>
            {#each allRequests??[] as requestData, index}
            <tr class="hover" on:click={dispatchHandler(requestData)}>
                    <th>{index+1}</th>
                    <td>{requestData.lastName}, {requestData.firstName} {requestData.middleName}</td>
                    <td>{requestData.requestId  }</td>
                    <td>{requestData.typeOfRequest  }</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
{#if allRequests?.length === 0}
    <p class="w-full h-[300px] flex items-center justify-center opacity-100">Nothing to show</p>
{/if}