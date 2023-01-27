<script>
	import { collection, onSnapshot } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"

    export let page;

    let activityLogs = [];

    const historySnapshot = onSnapshot(collection(db, "history"), (querySnapshot) => {
        // console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
        })
    })
</script>

<div class="w-[90%] bg-base-100 flex justify-center rounded-lg" class:hidden={page !== 3}>
    <p class="w-fit h-max text-center mb-4 p-2 bg-primary rounded-lg">REQUESTS HISTORY</p>
</div>