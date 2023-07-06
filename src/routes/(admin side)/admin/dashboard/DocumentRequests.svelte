<script>
    import { Timestamp } from "firebase/firestore";
	import DashboardCard from "./DashboardCard.svelte";
    export let documentRequests;

    let documentRequestsToday = [];
    let servedRequestsToday;
    let documentRequestsThisWeek = [];
    let servedRequestsThisWeek;
    let documentRequestsThisMonth = [];
    let servedRequestsThisMonth;

    let today = new Date()
    let todayMillis = new Date().valueOf();
    let daySpan = todayMillis - 86400000;
    let thisWeek = today - 604800000;
    let thisMonth = today - 2629800000;

    $: documentRequestsToday = documentRequests.filter((element)=>{ 
        // console.log(new Timestamp(element.dateAdded.seconds, element.dateAdded.nanoseconds).toDate().getDate() === today.getDate())
        // console.log(element.dateAddedMillis > daySpan)
        return element.dateAddedMillis > daySpan && new Timestamp(element.dateAdded.seconds, element.dateAdded.nanoseconds).toDate().getDate() === today.getDate()
    })
    $: documentRequestsThisWeek = documentRequests.filter((element)=> element.dateAddedMillis > thisWeek)
    $: documentRequestsThisMonth = documentRequests.filter((element)=> element.dateAddedMillis > thisMonth)
    
    $: servedRequestsToday = documentRequests.filter((element)=> {
        return element.status === "Request Completed" && (element.lastUpdated.toMillis() > daySpan && element.lastUpdated.toDate().getDate() === today.getDate())
    })
    $: servedRequestsThisWeek = documentRequests.filter((element)=> {
        return element.status === "Request Completed" && element.lastUpdated.toMillis() > thisWeek
    })
    $: servedRequestsThisMonth = documentRequests.filter((element)=> {
        return element.status === "Request Completed" && element.lastUpdated.toMillis() > thisMonth
    })
</script>

<section class="w-full h-max flex flex-col gap-4 p-4">
    <p class="pl-4 text-xl font-semibold">Document Requests</p>
    <div class="w-full grid grid-cols-4 gap-2 ">
        <!-- Document Requests Today -->
        <DashboardCard requestsCount={documentRequestsToday.length} cardColor={"primary"} title={"Requests Recieved Today:"}/>

        <!-- Document Requests This Week -->
        <DashboardCard requestsCount={documentRequestsThisWeek.length} cardColor={"primary"} title={"Requests This Week:"}/>

        <!-- Document Requests This Month -->
        <DashboardCard requestsCount={documentRequestsThisMonth.length} cardColor={"primary"} title={"Requests This Month:"}/>
        <DashboardCard requestsCount={Math.ceil(documentRequestsThisMonth.length / 7)} cardColor={"blue-500"} title={"Average Requests per day:"}/>
    </div>
    <div class="w-full flex justify-center">
        <div class="w-1/4 flex justify-center">
            <DashboardCard requestsCount={servedRequestsToday.length} cardColor={"green-400"} title={"Requests Served Today:"}/>
        </div>
        <div class="w-1/4 flex justify-center">
            <DashboardCard requestsCount={servedRequestsThisWeek.length} cardColor={"green-400"} title={"Requests Served This Week:"}/>
        </div>
        <div class="w-1/4 flex justify-center">
            <DashboardCard requestsCount={servedRequestsThisMonth.length} cardColor={"green-400"} title={"Requests Served This Month:"}/>
        </div>
    </div>
</section>
