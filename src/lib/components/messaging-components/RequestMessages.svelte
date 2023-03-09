<script>
    import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore";
    import {db, storage} from "$lib/firebase/client.js"
	import ChatBubble from "./Chat-Bubble.svelte";
	import ChatBubbleFile from "./Chat-Bubble-File.svelte";
	import ChatBox from "./Chat-Box.svelte";
	import { ref, uploadBytes } from "firebase/storage";
    import { zoom } from "$lib/zoom.js";

    export let requestId, requesterFullName, status;

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
            if(event.detail.messageType === "file"){
                await uploadBytes(ref(storage, event.detail.content), event.detail.file[0]??[]);
                await addDoc(collection(db, "requestMessages"),{
                    filePath: event.detail.content,
                    sender: requesterFullName,
                    trackingId: "id-" + requestId,
                    dateSent: Timestamp.now(),
                    messageType: event.detail.messageType
                })
            } else {
                await addDoc(collection(db, "requestMessages"),{
                    messageContent: event.detail.content,
                    sender: requesterFullName,
                    trackingId: "id-" + requestId,
                    dateSent: Timestamp.now(),
                    messageType: event.detail.messageType,
                    isViewed: false,
                })
            }


        } catch (error) {
            console.log(error.message)
        }
    }

    let enlargeImage = false;
    let imageToEnlarge = {};

    function viewHandler(event){
        enlargeImage = true;
        imageToEnlarge.imageUrl = event.detail.url;
        imageToEnlarge.alt = event.detail.alt;
    }

    function closeHandler(){
        imageToEnlarge = {};
        enlargeImage = false;
    }
</script>

<section class="h-full w-full flex flex-col pt-3">
    <section class="overflow-y-auto h-[55vh] lg:h-[65vh] w-full">
        {#if messages.length > 0}
            {#each messages as message}
                {#if message.messageType === "text"}
                    <ChatBubble {message} {requesterFullName}/>
                {:else}
                    <ChatBubbleFile {message} {requesterFullName} on:viewImage={viewHandler}/>
                {/if}
            {/each}
            
        {:else}
            <div class="h-full w-full flex items-center">
                <p class="w-full text-center opacity-70">Nothing to show</p>

            </div>
        {/if}
    </section>
    {#if enlargeImage}
        <div class="w-screen h-screen fixed top-0 left-0 flex flex-col items-center justify-start bg-black/70 z-20">
            <div class="w-full h-[100px] flex justify-start">
                <button class="btn btn-ghost hover:bg-transparent group" on:click={closeHandler}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-neutral ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p class="text-neutral group-hover:underline">Close</p>
                </button>
            </div>
            <div class="flex flex-col items-center gap-4 z-10">
                <img src={imageToEnlarge.imageUrl} alt={imageToEnlarge.alt} class="w-[75vw] lg:w-max lg:h-[80vh] hover:cursor-zoom-in" use:zoom={1.1}>
            </div>
        </div>  
    {/if}
    <section class="w-full h-[15%] border-t-[1px] border-accent p-2">
        {#if status === "Request Completed" || status === "Appointment Served"}
                <p class="w-full text-error text-center pb-2 text-sm">This request has been served, messaging is now disabled</p>
        {/if}
        <ChatBox {requestId} {status} on:send-message={sendHandler}/>
    </section>
</section>