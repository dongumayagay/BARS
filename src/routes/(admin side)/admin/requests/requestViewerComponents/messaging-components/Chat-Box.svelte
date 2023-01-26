<script>
    import {createEventDispatcher} from "svelte";

    export let requestId; 

    const dispatch = createEventDispatcher();

    let content;
    let file;
    let messageType;

    function dispatchHandler() {
        if(messageType === "text"){
            console.log(content)
            dispatch("send-message", {
                content, messageType
            })
        } else {
            console.log("message_files/" +  requestId + "/" + file[0].name)
            dispatch("send-message", {
                content: "message_files/" +  requestId + "/" + file[0].name,
                filename: file[0].name,
                messageType,
                file
            })
        }
        content = undefined;
        file = undefined;
    }
</script>

<form on:submit|preventDefault={dispatchHandler} class="w-full h-max flex items-center gap-4">
    {#if messageType === "text"}
        <input title="Send a message" placeholder="Send a message" class="input input-accent input-sm w-[50%] dark:input-primary" bind:value={content} required>
    {:else}
        <input required type="file" 
            accept=".jpg, .jpeg, .png" 
            name="file" 
            class="file-input file-input-bordered file-input-primary file-input-sm w-[50%] file:w-[40%]" 
            on:change={(event)=> file = event.target.files}
        />
    {/if}

    <select class="select select-error dark:select-accent select-sm w-full max-w-xs" bind:value={messageType}>
        <option value="text" selected>Send a Message</option>
        <option value="file">Upload a File</option>
    </select>

    <button type="submit" title="Send message">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>          
    </button>

</form>