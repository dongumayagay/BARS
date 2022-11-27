<script>

    export let requestId;
    
    let textCopied = false;
</script>

<div id="afterSubmit" class="lg:h-[300px] bg-neutral p-3 border-2 border-white flex flex-col items-center justify-center gap-3 shadow-lg rounded-md">
    <p class="w-[75%] lg:text-md text-center">Thank you for submitting your request, you will be notified through email if your document is ready.</p>
    <small class="text-center">Below is your request id. Please write it down or press the button to copy it to your device's clipboard.</small>
    <div class="flex items-center w-full justify-center">
        <p id="requestID" class="w-max font-bold p-3 mr-2 text-accent rounded-xl hover:underline">{requestId}</p>
        <button 
            title="Press to copy your request ID" 
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
        <button type="button" class="btn btn-ghost btn-sm hover:bg-neutral hover:underline" on:click={() => window.location.reload()}>Finish</button>
</div>