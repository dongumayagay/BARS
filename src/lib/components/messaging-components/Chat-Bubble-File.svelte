<script>
    import { createEventDispatcher } from "svelte";
    import { storage } from "$lib/firebase/client.js"
    import { months } from "$lib/stores.js"
    import { ref, getDownloadURL } from "firebase/storage";
    import {Timestamp,  } from "firebase/firestore"; 

    export let requesterFullName;
    export let message;

    const dispatch = createEventDispatcher();

    let minutes = new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getMinutes();

    if(minutes < 10){
        minutes = "0" + minutes
    }

    let time = new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getHours() + ":" + minutes;

    async function fetchURLHandler(){
        const path = message.filePath;
        const fileRef = ref(storage, path)

        const url = await getDownloadURL(fileRef)
        return url;
    }
</script>

<div class="chat  {message?.sender !== requesterFullName ? "chat-start":"chat-end"} flex flex-col gap-2 p-2">
    <div class="chat-header mr-2">
        {message?.sender === requesterFullName ? "You" : "ADMIN"}
        <time class="text-xs opacity-50">
            {time},
            {months[new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getMonth()]} {new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getDate()}
        </time>
    </div>
        {#await fetchURLHandler()}
            <div class="w-[150px] h-[150px] flex flex-col items-center justify-center">
                <img src="/loading.png" alt="loader" class="h-[20%]">
                <small>Loading image..</small>
            </div>
        {:then url} 
            <!-- <img src={url} alt={message.filePath} class="h-[200px]"> -->
            <div class="w-[50%] group relative">
                <img src={url} alt={message.filePath} class="h-max ">
                <button class="opacity-0 bg-black/50 w-full absolute top-0 group-hover:opacity-100 transition-all ease-in duration-100 h-full" on:click={()=>dispatch("viewImage", {url, alt: message.filePath})}>
                    <small class="text-neutral">Click to view</small>
                </button>
            </div>
        {:catch error}
            <div class="chat-bubble {message?.sender === requesterFullName ? "chat-bubble-info" : "chat-bubble-neutral"}">
                <p>{error}</p>
            </div>
        {/await}
   
</div>