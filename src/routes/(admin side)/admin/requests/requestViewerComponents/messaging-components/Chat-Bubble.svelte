<script>
    import { userStore, months} from "$lib/stores.js"
    import {Timestamp,  } from "firebase/firestore"; 
    
    export let message;
    let time = new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getHours() + ":" + new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getMinutes()
</script>

<div class="chat {message?.sender !== $userStore.email ? "chat-start":"chat-end"}">
    <div class="chat-header">
        {message?.sender === $userStore.email ? "You" : message?.sender}
        <time class="text-xs opacity-50">
            {time},
            {months[new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getMonth()]} {new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getDate()}
        </time>
    </div>
    <div class="chat-bubble {message?.sender === $userStore.email ? "chat-bubble-info" : "chat-bubble-neutral"}">{message?.messageContent}</div>
</div>