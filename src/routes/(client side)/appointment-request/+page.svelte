<script>
    import DatePicker from "./DatePicker.svelte";
    import InfoForm from "../../../lib/components/InfoForm.svelte";
	import OfficialsList from "./OfficialsList.svelte";

    let page = 0;

    let appointmentRequest = [];

    function nextHandler(event) {
        appointmentRequest = Object.assign(appointmentRequest, event.detail)
        page += 1;

        console.log(appointmentRequest, page);
    }

</script>

<div class="p-3 flex flex-col items-center gap-4">
    <ul class="steps w-full lg:w-[75%]">
        <li class="step font-semibold {page != 0 ? 'text-black/50' : ''}" class:step-success={page >= 0} class:text-sm={page!==0}>Contact Info</li>
        <li class="step {page >= 1 ? "step-success font-semibold": ""} {page != 1 ? 'text-black/50' : ''}" class:text-sm={page!==1}>Pick date & time</li>
        <li class="step {page >= 2 ? "step-success font-semibold": ""} {page != 2 ? 'text-black/50' : ''}" class:text-sm={page!==2}>Select an official</li>
        <li class="step {page === 3 ? "step-success font-semibold": ""} {page != 3 ? 'text-black/50' : ''}" class:text-sm={page!==3}>Confirm</li>
    </ul>

    <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 0}>
        <InfoForm on:next={nextHandler}/>
    </div>

    <div class="w-[95%] lg:w-max p-4 bg-neutral rounded-xl shadow-xl" class:hidden={page !== 1}>
        <DatePicker on:next={nextHandler} on:back={()=>{page -= 1}}/>
    </div>

    <div class="w-[95%] lg:w-max p-4 bg-neutral rounded-xl shadow-xl" class:hidden={page !== 2}>
        <OfficialsList on:next={nextHandler} on:back={()=>{page -= 1}}/>
    </div>

</div>