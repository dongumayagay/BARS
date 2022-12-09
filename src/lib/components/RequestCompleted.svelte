<script>
    import {goto} from "$app/navigation"

    export let requestId;
    export let trackerPath;
    
    let textCopied = false;
</script>

<div id="afterSubmit" class="lg:h-[300px] bg-neutral p-3 border-2 border-white flex flex-col items-center justify-center gap-3 shadow-lg rounded-md"> 
    {#if trackerPath == "./document-request/"}
        <p class="w-[75%] lg:text-md text-center">Your request has been submitted, you will be notified through email if your document is ready.</p>
    {:else}
        <p class="w-[75%] lg:text-md text-center">Your request has been submitted, you will be notified through email if your appointment request is approved.</p>
    {/if}
    <small class="text-center text-info">Below is your request id. An email is also sent to you containing the link to your request's tracker.</small>
    <div class="flex items-center w-full justify-center">
        <p id="requestID" class="w-max font-bold p-3 mr-2 text-accent rounded-xl hover:underline">{requestId}</p>
        <button 
            title="Copy your request ID" 
            class="p-2 gap-1 flex items-center btn btn-primary btn-sm" 
            on:click={() => {
                navigator.clipboard.writeText(requestId);
                textCopied = true;
                setTimeout(() => {textCopied = false}, 2000)
                }}>
            <p class="text-[10px]">{textCopied ? "Copied": "Copy"}</p>
            <i class="fa-regular fa-copy"></i>
        </button>
    </div>
        <button type="button" class="btn btn-ghost btn-sm hover:bg-neutral hover:underline" on:click={() => goto(trackerPath + requestId)}>Go to tracker</button>
</div>