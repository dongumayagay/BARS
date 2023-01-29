<script>
    import {Timestamp,  } from "firebase/firestore"; 

    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"
    ];
    
    export let message;
    export let requesterFullName;

    let time = new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getHours() + ":" + new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getMinutes()
</script>

<div class="chat {message?.sender !== requesterFullName ? "chat-start":"chat-end"}">
    <div class="chat-header">
        {message?.sender === requesterFullName ? "You" : "ADMIN"}
        <time class="text-xs opacity-50">
            {time},
            {months[new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getMonth()]} {new Timestamp(message?.dateSent.seconds??[], message?.dateSent.nanoseconds??[]).toDate().getDate()}
        </time>
    </div>
        <div class="chat-bubble w-fit p-3 {message?.sender === requesterFullName ? "chat-bubble-info" : "chat-bubble-neutral"}">
        <p class="h-full">{message?.messageContent}</p>
    </div>
</div>