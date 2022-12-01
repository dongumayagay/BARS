<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

export let appointmentRequest;
</script>

<section class="h-max lg:h-[575px] flex flex-col gap-4">
    <p class="w-full text-center font-bold lg:text-lg mb-2">Here's what we got from you:</p>
    <div class="flex flex-col lg:flex-row ">
        <!-- Basic Information section -->
        {#if appointmentRequest?.contactInfo}
            <div class="p-4 flex flex-col gap-[50px] border-b-2 lg:border-b-0 lg:border-r-2 border-secondary border-dashed">
                <div class="flex flex-col items-center justify-start gap-4">
                    <div class="w-full flex flex-col items-start justify-start gap-2 ">
                        <p class="w-full font-semibold lg:text-md">Full Name: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{appointmentRequest.contactInfo.lastName}, {appointmentRequest.contactInfo.firstName} {appointmentRequest.contactInfo.middleName}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Birthdate: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{appointmentRequest.contactInfo.birthdate}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Complete Address: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{appointmentRequest.contactInfo.address}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Email Address: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{appointmentRequest.contactInfo.email}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Phone Number: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{appointmentRequest.contactInfo.contactNo}</p>
                    </div>
                    <div class="w-full flex flex-col items-start justify-start gap-2">
                        <p class="w-full font-semibold lg:text-md">Purpose of the request: </p>
                        <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{appointmentRequest.contactInfo.purpose}</p>
                    </div>
                </div>
                <!-- <section class="w-full flex justify-center">
                    <button type="button" class="btn btn-primary flex gap-2 shadow-md" on:click={()=>dispatch('backToPageZero')}>
                        <p>Edit Contact Info</p>
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                </section> -->
            </div>
        {/if}
    
    
        <div class="p-4 w-full h-full lg:w-max flex flex-col justify-between gap-4">
            {#if appointmentRequest?.selectedDateAndTime}
                <div class="h-[150px] lg:h-[50%] flex flex-col gap-4 border-b-2 border-secondary border-dashed">
                    <p class="font-semibold">Selected Appointment Schedule</p>
                    <p class="w-full text-center lg:text-start">{appointmentRequest.selectedDateAndTime.date}, {appointmentRequest.selectedDateAndTime.time}</p>
                </div>
            {/if}
            {#if appointmentRequest?.selectedOfficial}
                <div class="h-[150px] lg:h-[50%] flex flex-col gap-4">
                    <p class="font-semibold">Selected Official</p>
                    <div class="flex items-center gap-2">
                        <p>{appointmentRequest.selectedOfficial.name}</p>
                        <small>({appointmentRequest.selectedOfficial.position})</small>
                    </div>
                </div>
            {/if}
        </div>
    </div>

    <div class="w-full flex justify-center">
        <button type="button" class="btn btn-success" on:click={()=>dispatch("submit")}>Submit Request</button>
    </div>
</section>

