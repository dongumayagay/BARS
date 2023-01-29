<script>
    import {Timestamp} from "firebase/firestore";
    import {createEventDispatcher} from "svelte";
    import {months} from "$lib/stores.js"
    import HistoryViewer from "./HistoryViewer.svelte";

    export let todayLogs;

    const dispatch = createEventDispatcher()

    function viewHandler(event) {
        dispatch("view", {
            ...event.detail
        })
        console.log(event.detail)
    }

    console.log(todayLogs)
</script>

<div class="w-full flex flex-col items-center pb-4">
    <p class="w-full border-b-2 border-dashed border-current font-semibold p-2">Less than a day ago</p>
    {#if todayLogs.length !== 0}
        {#each todayLogs??[] as log}
            <!-- <p>{JSON.stringify(log)}</p> -->
            <div class="w-[90%] flex flex-col gap-2 p-2">
                <div class="w-full flex justify-start gap-4">
                    <div class="flex gap-[4px]">
                        <p>{months[new Timestamp(log.logDate.seconds, log.logDate.nanoseconds).toDate().getMonth()]}</p>
                        <p>{new Timestamp(log.logDate.seconds, log.logDate.nanoseconds).toDate().getDate()}, </p>
                    </div>
                    <p>{new Timestamp(log.logDate.seconds, log.logDate.nanoseconds).toDate().getHours()}: {new Timestamp(log.logDate.seconds, log.logDate.nanoseconds).toDate().getMinutes()}</p>
                </div>
                <HistoryViewer {log} on:view={viewHandler}/>
                <div class="w-full flex justify-center gap-6">
                    <small>{log.previousStatus}</small>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                    <small>{log.currentStatus}</small>                  
                </div>
            </div>
        {/each}
    {:else}
        <p class="w-full text-center font-semibold opacity-75 p-10">Nothing to show</p>
    {/if}
</div>