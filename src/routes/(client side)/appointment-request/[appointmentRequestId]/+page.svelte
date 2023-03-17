<script>
    /** @type {import('./$types').PageData} */
    import NavigationButtons from './NavigationButtons.svelte';
    import RequestMessages from '$lib/components/messaging-components/RequestMessages.svelte';
    import { currentPage, months, } from "$lib/stores.js";
    import { goto } from "$app/navigation";
	import { Timestamp } from 'firebase/firestore';

    $currentPage = 3;

    export let data;

    const {appointmentRequest} = data;

    let page = 0;
    let requesterFullName = appointmentRequest.lastName + ", " + appointmentRequest.firstName + " " + appointmentRequest.middleName;

    let birth = new Date(appointmentRequest.birthDate);
    let birthDateFormat  = months[birth.getMonth()] + " " + birth.getDate() + ", " + birth.getFullYear()

    console.log(appointmentRequest);
</script>

<div class="w-full p-4 lg:pl-10">
    <button class="btn btn-info btn-sm gap-2" on:click={()=> goto("../ticket-tracker")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
        <p>Go Back</p>      
    </button>
</div>
<main class="p-4 w-full h-max flex flex-col lg:flex-row lg:items-start justify-center gap-4">
    <NavigationButtons {page} on:navigate={(event) => page = event.detail.index}/>
    <section class="w-[90vw] lg:w-[60vw] flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4 border-l-[1px]" class:hidden={page !== 0}>
        <div class="w-full flex justify-center items-center border-b-2 border-b-primary-focus border-dashed">
            <p class="w-max p-2 flex justify-center text-center rounded-xl font-semibold">ID: </p>
            <p class="font-semibold hover:underline">{appointmentRequest.id}</p>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex gap-2">
                <p class="text-[14px]">Type of Request: </p>
                <p class="text-[14px] font-semibold">Appointment Request</p>
            </div>
            <div class="flex flex-col justify-between md:flex-row-reverse gap-3">
                <div class="w-full items-end flex flex-col gap-4">
                    <p class="text-[12px] w-full md:w-[25vw]">Date Requested: {appointmentRequest.dateAdded.toDate()}</p>
                    <p class="text-[12px] w-full md:w-[25vw]">Last Updated: {new Timestamp(appointmentRequest.lastUpdated?.seconds??[], appointmentRequest.lastUpdated?.nanoseconds??[]).toDate()}</p>
                </div>
                <div class="flex flex-col">
                    <p class="font-semibold">{appointmentRequest.lastName}, {appointmentRequest.firstName} {appointmentRequest.middleName??""} {appointmentRequest.suffix??""}</p>
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                        <small class="hover:underline hover:underline-offset-2">{appointmentRequest.email}</small>
                    </div>
                    <div class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                        <small class="hover:underline hover:underline-offset-2">{appointmentRequest.contactNo}</small>
                    </div> <div class="h-fit flex items-center gap-2 mt-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                          </svg>
                          
                        <small class="hover:underline hover:underline-offset-2">{appointmentRequest.completeAddress}</small>
                    </div>
                    <div class="h-fit flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                          </svg>
                          
                        <small class="hover:underline hover:underline-offset-2">{birthDateFormat}</small>
                    </div>
                </div>
            </div>
            <section class="w-full flex flex-col lg:flex-row justify-between lg:justify-center p-4 gap-10">
                    <div class="text-sm flex flex-col gap-4">
                        <p class="font-semibold">Selected Schedule</p>
                        <div class="h-[60px] flex flex-col justify-between">
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
                                <p>{appointmentRequest.appointmentDate}</p>
                            </div>

                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                <p>{appointmentRequest.appointmentTime}</p>
                            </div>
                        </div>
                    </div>

                    <div class="text-sm flex flex-col lg:items-center gap-4">
                        <p class="font-semibold lg:text-center">Selected Official</p>
                        <div>
                            <div class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p>{appointmentRequest.selectedOfficial.name}</p>
                                <small>({appointmentRequest.selectedOfficial.position})</small>
                            </div>
                        </div>
                    </div>

            </section>
            <div class="flex gap-2">
                <small>Status:</small>
                <small class:text-info={appointmentRequest.status=="pending"}>{appointmentRequest.status}</small>

            </div>
        </div>
    </section>
    <section class="w-full lg:w-[60vw] h-full flex justify-center lg:border-l-[1px] border-accent p-2" class:hidden={page !== 1}>
        <RequestMessages requestId={appointmentRequest.id} {requesterFullName} status={appointmentRequest.status}/>
    </section>
</main>