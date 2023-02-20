<script>
    import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
    import {userStore} from "$lib/stores.js"
    import {db, storage} from "$lib/firebase/client.js"
	import ChatBubble from "./Chat-Bubble.svelte";
	import ChatBox from "./Chat-Box.svelte";
	import { ref, uploadBytes } from "firebase/storage";
    import { sendEmail } from '$lib/utils';
	import ChatBubbleFile from "./Chat-Bubble-File.svelte";

    export let requestId,  requesterFullName,  requestPath, requestorEmail;

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

    async function emailRequestId() {
		const result = await sendEmail({
			to: requestorEmail,
			subject: 'New message to: ' + requesterFullName,
			html: '<a href="https://bars-gf.vercel.app/' + requestPath + '/' + requestId + '">Click Here</a><p> to view your new message and track your request</p>'
		});

        console.log(JSON.stringify(result))
        alert("An email containing this request's tracker link has been sent");
	}

    async function sendHandler(event) {
        try {

            if(event.detail.messageType === "file"){
                await uploadBytes(ref(storage, event.detail.content), event.detail.file[0]??[]);
                await addDoc(collection(db, "requestMessages"),{
                    filePath: event.detail.content,
                    sender: $userStore.email,
                    reciever: requesterFullName,
                    trackingId: "id-" + requestId,
                    dateSent: Timestamp.now(),
                    messageType: event.detail.messageType
                })
            } else {
                await addDoc(collection(db, "requestMessages"),{
                    messageContent: event.detail.content,
                    sender: $userStore.email,
                    reciever: requesterFullName,
                    trackingId: "id-" + requestId,
                    dateSent: Timestamp.now(),
                    messageType: event.detail.messageType
                })
            }
            emailRequestId()
        } catch (error) {
            console.log(error.message)
        }
    }
</script>

<section class="h-full w-full flex flex-col">
    <section class="overflow-y-auto h-[80vh] w-full ">
        {#if messages.length > 0}
            {#each messages as message}
                {#if message.messageType === "text"}
                    <ChatBubble {message}/>
                {:else}
                    <ChatBubbleFile {message}/>
                {/if}
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