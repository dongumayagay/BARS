<script>
    import { storage } from "$lib/firebase/client.js"
    import { adminUser, months } from "$lib/stores.js"
    import { ref, getDownloadURL } from "firebase/storage";
    import {Timestamp,  } from "firebase/firestore"; 

    // export let requestId;
    export let message;
    let minutes = new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getMinutes();

    if(minutes < 10){
        minutes = "0" + minutes
    }

    let time = new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getHours() + ":" + minutes;

    async function fetchURLHandler(){
        const path = message.messageContent;
        const fileRef = ref(storage, path)

        const url = await getDownloadURL(fileRef)
        return url;
    }
</script>

<div class="chat {message?.sender !== $adminUser.email ? "chat-start":"chat-end"} flex flex-col gap-2 p-2">
    <div class="chat-header mr-2">
        {message?.sender === $adminUser.email ? "You" : message?.sender}
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
            <img src={url} alt={message.messageContent} class="h-[200px]">
        {:catch error}
            <div class="chat-bubble {message?.sender === $adminUser.email ? "chat-bubble-info" : "chat-bubble-neutral"}">
                <p>{error}</p>
            </div>
        {/await}
   
</div>