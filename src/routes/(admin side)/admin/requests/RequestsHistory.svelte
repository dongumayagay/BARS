<script>
	import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
    import {months} from "$lib/stores.js"
	import HistoryViewer from "./request-history-components/HistoryViewer.svelte";
    import RequestViewer from "./RequestViewer.svelte";
	import LogsToday from "./request-history-components/LogsToday.svelte";
	import LogsThisWeek from "./request-history-components/LogsThisWeek.svelte";

    export let page;

    let viewing = false;
    let dataToView = {};

    let activityLogs = [];

    const historySnapshot = onSnapshot(query(collection(db, "history"), orderBy("logDate", "desc")), (querySnapshot) => {
        activityLogs = []

        const today = Timestamp.now().toMillis();

        // console.log(currentMonth, currentDate, currentYear)

        querySnapshot.forEach((doc) => {
            const timestamp = new Timestamp(doc.data().logDate?.seconds??[], doc.data().logDate?.nanoseconds??[]).toMillis()
            const millisecondsDifference = today - timestamp;
            const daysDifference = Math.ceil(millisecondsDifference / 86400000) - 1 ;

            console.log(doc.data().requestId, today, timestamp, daysDifference)

            // logs less than a year (365.75 == average days of a year in whole leap years)
            if(daysDifference < 365){
                // logs less than a month
                if(daysDifference < 30){
                    // logs less than a week
                    if(daysDifference < 7){
                        if(daysDifference < 1){
                            activityLogs.todayLogs = [...activityLogs?.todayLogs??[], {
                                ...doc.data()
                            }]
                        } else {
                            let dayAgo = " day ago"

                            if(daysDifference > 1){ dayAgo = " days ago" }

                            activityLogs.lessThanAWeekAgoLogs = [...activityLogs?.lessThanAWeekAgoLogs??[], {
                                ...doc.data(),
                                ago: daysDifference + dayAgo
                            }]
                        }
                    } else {
                        let week = daysDifference / 7 ;
                        let weekAgo = " week ago";
    
                        if(week > 1){ weekAgo = " weeks ago" }

                        activityLogs.weeksAgoLogs - [...activityLogs?.weeksAgoLogs??[], {
                            ...doc.data(),
                            ago: week + weekAgo
                        }]
                    }
                } else {
                    let month = daysDifference / 30;
                    let monthAgo = " month ago";

                    if(month > 1){ monthAgo = " months ago"} 

                    activityLogs.monthsAgoLogs - [...activityLogs?.monthsAgoLogs??[], {
                        ...doc.data(),
                        ago: month + monthAgo
                    }]
                }
            } else {
                let year = daysDifference / 365
                let yearAgo = " year ago"

                if(year > 1){ yearAgo = " years ago" } 

                activityLogs.yearsAgoLogs - [...activityLogs?.yearsAgoLogs??[], {
                    ...doc.data(),
                    ago: year + yearAgo
                }]
            }

        }
        )
    })

    function viewHandler(event) {
        dataToView = event.detail;
        viewing = true;
    }

    function closeHandler() {
        dataToView = {};
        viewing = false;
    }
</script>

<section class="w-[90%] bg-base-100 " class:hidden={page !== 3}>
    <div class="w-full flex justify-center rounded-lg py-6" class:hidden={viewing}>
        <!-- <p class="w-fit h-max text-center mb-4 p-2 bg-primary rounded-lg">REQUESTS HISTORY</p> -->
        <div class="overflow-y-auto w-full max-h-[575px] bg-base-100 flex flex-col items-center rounded-lg py-6" >
            <LogsToday todayLogs = {activityLogs?.todayLogs??[]}  on:view={viewHandler}/>
            <LogsThisWeek logsThisWeek = {activityLogs?.lessThanAWeekAgoLogs??[]} on:view={viewHandler}/>
        </div>
    </div>
    {#if viewing}
            <RequestViewer {dataToView} on:close={closeHandler}/>
    {/if}
</section>