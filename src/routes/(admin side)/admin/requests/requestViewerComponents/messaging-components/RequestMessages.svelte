<script>
    import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
    import {adminUser} from "$lib/stores.js"
    import {db, storage} from "$lib/firebase/client.js"
	import ChatBubble from "./Chat-Bubble.svelte";
	import ChatBox from "./Chat-Box.svelte";
	import { ref, uploadBytes } from "firebase/storage";

    export let requestId;
    export let requesterFullName;
    let messages = [];

    const fetchRequestMessages = onSnapshot(query(collection(db, "requestMessages"), where("trackingId", "==", "id-"+requestId??[]), orderBy("dateSent")), (querySnapshot) => {
        messages = [];
        querySnapshot.forEach((doc) => {
            messages = [...messages, {
            ...doc.data() 
            }]
        })
        console.log("id-" + requestId, messages)
    })

    async function sendHandler(event) {
        try {
            await addDoc(collection(db, "requestMessages"),{
                messageContent: event.detail.content,
                sender: $adminUser.email,
                reciever: requesterFullName,
                trackingId: "id-" + requestId,
                dateSent: Timestamp.now(),
                messageType: event.detail.messageType
            })

            if(event.detail.messageType === "file"){
                await uploadBytes(ref(storage, event.detail.content), event.detail.file??[]);
                console.log("this is a file upload")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
</script>

<section class="h-full w-full flex flex-col">
    <section class="overflow-y-auto h-full w-full ">
        {#if messages.length > 0}
            {#each messages as message}
                <ChatBubble {message}/>
            {/each}
        {:else}
            <div class="h-full w-full flex items-center">
                <p class="w-full text-center opacity-70">Nothing to show</p>

            </div>
        {/if}
    </section>
    <section class="h-[15%] flex items-center border-t-2 p-2">
        <ChatBox {requestId} on:send-message={sendHandler}/>
    </section>
</section>