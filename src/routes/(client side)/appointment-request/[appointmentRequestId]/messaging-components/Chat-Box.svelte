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
            dispatch("send-message", {
                content: "message_files/" +  requestId + "/" + file[0].name,
                messageType,
                file
            })
        }
        content = undefined;
    }
    // $: console.log(messageType, file, content);
    // $: console.log("/" +  requestId + "/message_files/" + file.FileList[0].name)
</script>

<form on:submit|preventDefault={dispatchHandler} class="w-full h-max flex flex-col lg:flex-row items-center gap-4">
    {#if messageType === "text"}
    <div class="w-full flex gap-3">
        <input title="Send a message" placeholder="Send a message" class="input input-sm w-full dark:input-primary" bind:value={content} required>
        <button type="submit" title="Send message" class="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>          
        </button>
    </div>
    {:else}
    <div class="w-full flex gap-3">
        <input required type="file" 
            accept=".jpg, .jpeg, .png, .svg, .webp" 
            name="file" 
            class="file-input file-input-bordered file-input-primary file-input-sm w-full file:w-[40%]" 
            on:change={(event)=> file = event.target.files}
        />
        <button type="submit" title="Send message" class="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>          
        </button>
    </div>
    {/if}

    <select class="w-[] lg:w-[25%] select select-error dark:select-accent select-sm max-w-xs" bind:value={messageType}>
        <option value="text" selected>Send a Message</option>
        <option value="file">Upload a File</option>
    </select>

    <button type="submit" title="Send message" class="hidden lg:block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>          
    </button>

</form>