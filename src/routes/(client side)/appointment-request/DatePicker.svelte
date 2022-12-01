<script>
    import {db} from '$lib/firebase/client.js'
    import {createEventDispatcher} from "svelte";
    import { collection, getDocs, query, QuerySnapshot, where } from "firebase/firestore"

    const dispatch = createEventDispatcher();

    const currentMonth = new Date().toLocaleDateString().split('/')[0];
    let tomorrowDate = parseInt(new Date().toLocaleDateString().split('/')[1]) + 1;
    const currentYear = new Date().toLocaleDateString().split('/')[2];
    if(parseInt(tomorrowDate) < 10){
        tomorrowDate = "0" + tomorrowDate;
    }

    let dateToday = currentYear + "-" + currentMonth + "-" + tomorrowDate;

    let barangayWorkingHours = [
        "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ]
    let availableHours = [];

    let selectedDateAndTime = {
        date: "",
        time: ""
    };

    async function filterHours(date) {
        availableHours = barangayWorkingHours;
        const findReservedDay = await getDocs(query(collection(db, 'appointmentRequests'), where("appointmentDate", "==", date))) 

        findReservedDay.forEach((doc) => {
            availableHours = availableHours.filter(time => time != doc.data().appointmentTime);
        })
    }

    function submitHandler() {
        dispatch("next", {
            selectedDateAndTime
        })
    }

    $: if(!!selectedDateAndTime.date) filterHours(selectedDateAndTime.date)
</script>


<form class="w-full h-max p-4 flex flex-col items-center gap-4" on:submit|preventDefault={submitHandler} on:reset={(event)=>{event.target.reset(); availableHours = []}}>
    <p class=" font-bold">Appointment Schedule</p>
    <div class="w-full h-full lg:w-full flex flex-col gap-4">

        <div>
            <p class="w-full text-center">Kindly Select an Appointment Date</p>
            <p class="text-center text-info"><small>Staff's working time are Monday to Friday, 8:00am to 5:00pm</small></p>
        </div>

        <div class="w-full h-full flex flex-col lg:flex-row lg:items-center gap-4">
            <div class="w-full">
                <label class="label w-full lg:w-[20rem] flex justify-start" for="date">
                    <span class="label-text">Pick a date</span>
                </label>
                <input type="date" 
                    id="date"  
                    min={dateToday}
                    placeholder="Type here" 
                    class="input input-bordered w-full lg:max-w-xs bg-neutral border-secondary focus:outline-primary focus:ring-0 focus:border-secondary"
                    bind:value={selectedDateAndTime.date} 
                    
                />
            </div>
            <div class="w-full flex justify-center lg:justify-start lg:flex-col gap-2 lg:gap-0">
                <label class="label" for="time">
                    <span class="label-text">Pick a time: </span>
                </label>
                <select id="time" 
                    class="select select-bordered bg-neutral border-secondary focus:outline-primary focus:ring-0 focus:border-secondary"
                    placeholder="Pick a Time"
                    bind:value={selectedDateAndTime.time} 
                    required
                >
                    <option disabled selected>Pick a time</option>
                    {#each availableHours as availableHour}
                        <option>{availableHour}</option>
                    {/each}
                </select>
            </div>
        </div>
    </div>

    <section class="w-full pt-4 flex flex-col lg:flex-row gap-4 justify-around items-center ">
        <div class="flex justify-start gap-1">
            <button type="submit" class="btn btn-primary flex lg:gap-1">
                <p>Next</p> 
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button type="reset" class="btn btn-ghost hover:bg-neutral hover:underline hover:underline-offset-2">Clear Form</button>
        </div>
        <button type="button" 
            class="btn btn-neutral p-3 lg:p-4 flex items-center gap-2 hover:bg-neutral group hover:border-none" 
            on:click={()=>dispatch("back")}
        >
            <i class="fa-solid fa-arrow-left"></i>
            <p class=" group-hover:underline group-hover:underline-offset-2">Go Back</p>
        </button>
    </section>
</form>
