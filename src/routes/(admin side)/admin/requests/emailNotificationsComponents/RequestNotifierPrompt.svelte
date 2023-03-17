<script>
    import { createEventDispatcher, onMount } from "svelte"
    import { Circle } from "svelte-loading-spinners";
    import { notifyExpiringRequest } from "$lib/sendEmailNotifications/expiringDocumentRequestNotifier.js"
	import { Timestamp } from "firebase/firestore";

    export let requestsToNotify;

    let loadingStatement;
    let showLoadingScreen;

    onMount(()=>{
        showLoadingScreen = true;
        loadingStatement = "Notifying expiring requests...."
        requestsToNotify.map(async (request)=>{
            const lastUpdated = new Timestamp(request.lastUpdated.seconds, request.lastUpdated.nanoseconds).toMillis();
            console.log(new Date(lastUpdated + 864000000))
            await notifyExpiringRequest(request, new Date( lastUpdated + 864000000));
        })
        showLoadingScreen = false;
    })
</script>

<!-- {#if showLoadingScreen}
    
{/if} -->
<section class="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center rounded-lg z-20" class:hidden={showLoadingScreen === false}>
    <div class="w-full h-[300px] flex flex-col items-center justify-center gap-2">
        <Circle color={"#fff"}/>
        <p class="text-white">{loadingStatement}</p>
    </div>
</section>