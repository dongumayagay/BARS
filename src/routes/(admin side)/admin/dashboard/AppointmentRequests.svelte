<script>
	import { Timestamp } from "firebase/firestore";
    import DashboardCard from "./DashboardCard.svelte";

    export let appointmentRequests;

    let appointmentRequestsToday;
    let servedRequestsToday;
    let appointmentRequestsThisWeek;
    let servedRequestsThisWeek;
    let appointmentRequestsThisMonth;
    let servedRequestsThisMonth;

    let today = new Date()
    let todayMillis = new Date().valueOf();
    let daySpan = todayMillis - 86400000;
    let thisWeek = today - 604800000;
    let thisMonth = today - 2629800000;

    $: appointmentRequestsToday = appointmentRequests.filter((element)=>{
        return element.dateAddedMillis > daySpan && new Timestamp(element.dateAdded.seconds, element.dateAdded.nanoseconds).toDate().getDate() === today.getDate()
    })
    $: appointmentRequestsThisWeek = appointmentRequests.filter((element)=> element.dateAddedMillis > thisWeek)
    $: appointmentRequestsThisMonth = appointmentRequests.filter((element)=> element.dateAddedMillis > thisMonth)

    $: servedRequestsToday = appointmentRequestsToday.filter((element)=> {
        return element.status === "Request Completed" && (element.lastUpdated.toMillis() > daySpan && element.lastUpdated.toDate().getDate() === today.getDate())
    })
    $: servedRequestsThisWeek = appointmentRequestsThisWeek.filter((element)=> {
        return element.status === "Request Completed" && element.lastUpdated.toMillis() > thisWeek
    })
    $: servedRequestsThisMonth = appointmentRequestsThisMonth.filter((element)=> {
        return element.status === "Request Completed" && element.lastUpdated.toMillis() > thisMonth
    })
</script>

<section class="w-full h-max flex flex-col gap-4 p-4">
    <p class="pl-4 text-xl font-semibold">Appointment Requests</p>
    <div class="w-full grid grid-cols-4 gap-2 ">
        <!-- Appointment Requests Today -->
        <DashboardCard requestsCount={appointmentRequestsToday.length} cardColor={"primary"} title={"Appointments Recieved Today:"}/>

        <!-- Appointment Requests This Week -->
        <DashboardCard requestsCount={appointmentRequestsThisWeek.length} cardColor={"primary"} title={"Appointments This Week:"}/>

        <!-- Appointment Requests This Month -->
        <DashboardCard requestsCount={appointmentRequestsThisMonth.length} cardColor={"primary"} title={"Appointments This Month:"}/>
        <DashboardCard requestsCount={Math.ceil(appointmentRequestsThisMonth.length / 7)} cardColor={"info"} title={"Average Requests per day:"}/>
    </div>
    <div class="w-full flex justify-center">
        <div class="w-1/4 flex justify-center">
            <DashboardCard requestsCount={servedRequestsToday.length} cardColor={"success"} title={"Appointments Served Today:"}/>
        </div>
        <div class="w-1/4 flex justify-center">
            <DashboardCard requestsCount={servedRequestsThisWeek.length} cardColor={"success"} title={"Appointments Served This Week:"}/>
        </div>
        <div class="w-1/4 flex justify-center">
            <DashboardCard requestsCount={servedRequestsThisMonth.length} cardColor={"success"} title={"Appointments Served This Month:"}/>
        </div>
    </div>
</section>