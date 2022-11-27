<script>
 import { createEventDispatcher } from "svelte"

 const dispatch = createEventDispatcher();

export let contactInfo;
export let documentsRequestList;

$: console.log(contactInfo, documentsRequestList)
</script>

<section>
    <p class="w-full text-center font-bold lg:text-lg mb-2">Here's what we got from you:</p>
    <div class="h-max flex flex-col lg:flex-row">
        <!-- Basic Information section -->
        <div class="p-4 flex flex-col gap-[50px] border-b-2 lg:border-b-0 lg:border-r-2 border-primary">
            <div class="flex flex-col items-center justify-start gap-4">
                <div class="w-full flex flex-col items-start justify-start gap-2 ">
                    <p class="w-full font-semibold lg:text-md">Full Name: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{contactInfo.lastName}, {contactInfo.firstName} {contactInfo.middleName}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start gap-2">
                    <p class="w-full font-semibold lg:text-md">Birthdate: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{contactInfo.birthdate}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start gap-2">
                    <p class="w-full font-semibold lg:text-md">Complete Address: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{contactInfo.address}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start gap-2">
                    <p class="w-full font-semibold lg:text-md">Email Address: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{contactInfo.email}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start gap-2">
                    <p class="w-full font-semibold lg:text-md">Phone Number: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{contactInfo.contactNo}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start gap-2">
                    <p class="w-full font-semibold lg:text-md">Purpose of the request: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{contactInfo.purpose}</p>
                </div>
            </div>
            <section class="w-full flex justify-center">
                <button type="button" class="btn btn-primary flex gap-2 shadow-md" on:click={()=>dispatch('backToPageZero')}>
                    <p>Edit Contact Info</p>
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </section>
        </div>
        
        <!-- Documents Requested section -->
        <div class="p-4 w-max flex flex-col justify-between gap-4">
            <p class="w-full text-center font-semibold">Documents you requested: </p>
            {#each documentsRequestList as document}
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-circle text-[8px]"></i>
                    <p>{document.name}</p>

                </div>
            {/each}
            <section class="w-full flex justify-center">
                <button type="button" class="flex gap-2 btn btn-primary shadow-md" on:click={()=>dispatch('backToPageOne')}>
                    <p>Edit this list</p>
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
            </section>
        </div>

    </div>
</section>