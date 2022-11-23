<script>
    import DatePicker from "../../../lib/components/DatePicker.svelte";
    import InfoForm from "../../../lib/components/InfoForm.svelte";

    let date;

    let dateTimeVisible = false;

    let dateDisplay;
    let timeFormat;

    let officialsList = [
        {name: "Official 1", position: "Barangay Captain"},
        {name: "Official 2", position: "Barangay Vice Captain"},
        {name: "Official 3", position: "Secretary"},
        {name: "Official 4", position: "Administrator"},
        {name: "Official 5", position: "Deputy/Kagawad"},
        {name: "Official 6", position: "Deputy/Kagawad"},
        {name: "Official 7", position: "Deputy/Kagawad"},
    ];

    const months = ["January", "February", "March", 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const weekDays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $: {
        let dateFormat = new Date(date);
        let dateHours = dateFormat.getHours();
        let dateMins = dateFormat.getMinutes();
        
        if(dateMins < 10){
            dateMins = "0" + dateMins
        }

        let dateString = weekDays[dateFormat.getDay()] + ", " + months.at(dateFormat.getMonth()) + " " + dateFormat.getDate();
        let ampm;

        if(dateHours < 12){
            ampm = "AM";
        } else if(dateHours >= 12){
            ampm = "PM";
        }

        switch(dateHours){
            case 12: 
                timeFormat = dateHours + ":" + dateMins + " " + ampm;
                break;
            case 0:
                timeFormat = '12:' + dateMins + " " + ampm;
                break;
            default:
                timeFormat = (dateHours % 12) + ":" + dateMins + ampm;
        }
        dateDisplay = dateString + " at " + timeFormat;
        console.log(dateDisplay)
    }
</script>

<section class="px-4 py-6 lg:px-0">
    <form class="grid grid-cols-1 gap-6 p-4 rounded-lg form-control bg-neutral lg:grid-cols-11">
        <section class="lg:col-span-5">
            <InfoForm />
        </section>

        <section class=" lg:col-span-3 w-full h-[300px] flex flex-col items-center gap-4">
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
        </section>

        <section class="lg:col-span-3 h-full flex flex-col items-center justify-start lg:justify-center gap-4">
            <div class="flex justify-center">
                <p class="p-2 rounded-xl font-medium  text-center lg:w-fit">Who would you like to have an appointment with?</p>
            </div>
            <div class="flex flex-col gap-2">
                <p>Below are the list of the Barangay Officials</p>
                <div class="overflow-y-auto max-h-[300px] lg:max-h-[300px] flex flex-col gap-3">
                    {#each officialsList as official}
                        <div class="flex items-center gap-2">
                            <input type="radio" name="officials" class="radio radio-primary">
                            <p class="bg-primary w-full p-2 rounded-xl">{official.name}<small>({official.position})</small></p>
                        </div>
                    {/each}
                </div>
            </div>
        </section>

        <section class="lg:col-span-3">
            <div class="flex gap-3">
                <button type="button"
                    class="btn btn-primary">
                    Validate
                </button>
                <button type="reset"
                    class="hover:underline hover:underline-offset-2"
                    on:click={()=>{
                        date = undefined;     
                    }}
                    >
                    Clear Form
                </button>
            </div>
        </section>

 </form>
</section>