<script>
 import { createEventDispatcher } from "svelte"

 const dispatch = createEventDispatcher();

export let documentRequest;
// export let documentsRequestList;
// const {contactInfo, documentsRequestList} = documentRequest;
// $: console.log(contactInfo, documentsRequestList)
</script>

<section class="flex flex-col gap-4 justify-center">
    <p class="w-full text-center font-bold lg:text-lg mb-2">Here's what we got from you:</p>
    <div class="h-max flex flex-col lg:flex-row">
        <!-- Basic Information section -->
        {#if documentRequest?.contactInfo}
            
            <div class="p-4 flex flex-col gap-[50px] border-b-2 lg:border-b-0 lg:border-r-2 border-primary">
                <div class="flex flex-col items-center justify-start gap-4">
                    <div class="w-full flex flex-col items-start justify-start gap-2 ">
                        <p class="w-full font-semibold lg:text-md">Full Name: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{documentRequest.contactInfo.lastName}, {documentRequest.contactInfo.firstName} {documentRequest.contactInfo.middleName}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Birthdate: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{documentRequest.contactInfo.birthdate}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Complete Address: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{documentRequest.contactInfo.address}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Email Address: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{documentRequest.contactInfo.email}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Phone Number: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{documentRequest.contactInfo.contactNo}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Purpose of the request: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{documentRequest.contactInfo.purpose}</p>
                    </div>
                </div>
            </div>
        {/if}
        
        <!-- Documents Requested section -->
        {#if documentRequest?.listOfRequestedDocuments}
        <div class="p-4 w-full lg:w-max flex flex-col justify-between gap-4">
            <p class="w-full text-center font-semibold">Documents you requested: </p>
            {#each documentRequest.listOfRequestedDocuments as document}
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-circle text-[8px]"></i>
                    <p>{document.name}</p>
                </div>
            {/each}
        </div>
        {/if}

    </div>
    <div class="w-full flex justify-around">
        <button type="button" class="btn btn-success hover:text-neutral hover:scale-105" on:click={()=>dispatch("submit")}>Submit Request</button>
        <button type="button" class="btn btn-neutral p-3 lg:p-4 flex items-center gap-2 hover:bg-neutral group hover:border-none" on:click={()=>dispatch("back")}>
            <i class="fa-solid fa-arrow-left"></i>
            <p class=" group-hover:underline group-hover:underline-offset-2">Go Back</p>
        </button>
    </div>
</section>