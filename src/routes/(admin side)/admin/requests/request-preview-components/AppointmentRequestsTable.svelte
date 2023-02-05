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
                <th>Request ID</th>
                <th>Requested Schedule</th>
            </tr>
        </thead>
        <tbody>
            {#each appointmentRequests as requestData, index}
            <tr class="hover" on:click={dispatchHandler(requestData)}>
                <th>{index+1}</th>
                <td>{requestData.lastName}, {requestData.firstName} {requestData.middleName}</td>
                <td>{requestData.requestId}</td>
                <td class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <p>{requestData.appointmentDate}</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>{requestData.appointmentTime}</p>
                    </div>  
                </td>
            </tr>
            {/each}
        </tbody>
    </table>
</div>
{#if appointmentRequests.length === 0}
    <p class="w-full h-[300px] flex items-center justify-center opacity-100">Nothing to show</p>
{/if}