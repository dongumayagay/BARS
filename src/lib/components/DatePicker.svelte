<script>
    export let date;

    export let dateTimeVisible = false;

    export let dateDisplay;
</script>


<main class="w-full h-[300px] flex flex-col items-center gap-4">
    <p class=" font-bold">Appointment Schedule</p>
    <div class="w-[70%] lg:w-full flex flex-col gap-1">

        <div>
            <p class="w-full text-center">Kindly Select an Appointment Date</p>
            <p class="text-center text-info"><small>Staff's working time are Monday to Friday, 8:00am to 5:00pm</small></p>
        </div>

        <button type="button"
            on:click={()=>dateTimeVisible=!dateTimeVisible} 
            class="w-full bg-primary p-3 rounded-xl active:scale-[0.95] flex flex-row items-center justify-between transition-all duration-200"
        >
            {#if date != undefined}
                <p class="w-full text-center text-sm">{dateDisplay}</p>
            {:else }
                <p class="w-full text-center">Select a date</p>
            {/if}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                
        </button>

        <button type="button" class="flex flex-col items-center justify-center" class:hidden={!dateTimeVisible}>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="absolute top-0 left-0 w-screen lg:min-h-screen h-[250vh] lg:h-[200vh] bg-black/50 z-1" on:click|self={() => dateTimeVisible = !dateTimeVisible}></div>
            <div class="relative w-5 h-5 bg-primary top-[10px] rotate-45 z-2"></div>
            <div class="w-max lg:w-max h-max p-3 bg-primary flex flex-col items-center justify-center gap-2 rounded-2xl z-10">
                <button type="button" class="w-full flex items-start justify-end" on:click={() => dateTimeVisible = !dateTimeVisible}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-black ">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <input type="datetime-local" class="input input-md bg-neutral" bind:value={date}>
            </div>
            <small class="z-10 text-white">Click the CALENDAR ICON to set date and time</small>
        </button>
    </div>

</main>
