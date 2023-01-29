<script>
    import {Timestamp} from "firebase/firestore";
    import {createEventDispatcher} from "svelte";
    import HistoryViewer from "./HistoryViewer.svelte";

    export let logsThisWeek;

    const dispatch = createEventDispatcher()

    function viewHandler(event) {
        dispatch("view", {
            ...event.detail
        })
        console.log(event.detail)
    }
</script>

<div class="w-full flex flex-col items-center border-b-2 border-current pb-4">
    <p class="w-full border-b-2 border-dashed border-current font-semibold p-2">Less than a week ago</p>
    {#each logsThisWeek??[] as log}
        <!-- <p>{JSON.stringify(log)}</p> -->
        <div class="w-full flex flex-col gap-2 p-2">
            <p class="w-full p-2 mb-2">{log.ago}</p>
            <HistoryViewer {log} on:view={viewHandler}/>
            <div class="w-full flex justify-center gap-10">
                <small>{log.previousStatus}</small>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                </svg>
                <small>{log.currentStatus}</small>                  
            </div>
        </div>
    {/each}
</div>