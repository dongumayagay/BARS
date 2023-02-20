<script>
    import {createEventDispatcher} from "svelte";

    export let appointmentRequests;

    const dispatch = createEventDispatcher();

    function dispatchHandler(requestData) {
        dispatch("view", {
            requestData
        })
    }
</script>

<div class="w-full">
    <table class="table w-full">
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th>Requested Official</th>
                <th>Requested Date</th>
                <th>Requested Time</th>
            </tr>
        </thead>
        <tbody>
            {#each appointmentRequests as requestData, index}
            <tr class="hover" on:click={dispatchHandler(requestData)}>
                <th>{index+1}</th>
                <td>{requestData.lastName}, {requestData.firstName} {requestData.middleName}</td>
                <td class="flex flex-col">
                    <p>{requestData.selectedOfficial.name}</p>
                    <small>{requestData.selectedOfficial.position}</small>
                </td>
                <td>{requestData.appointmentDate}</td>
                <td>{requestData.appointmentTime}</td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
{#if appointmentRequests.length === 0}
    <p class="w-full h-[300px] flex items-center justify-center opacity-100">Nothing to show</p>
{/if}