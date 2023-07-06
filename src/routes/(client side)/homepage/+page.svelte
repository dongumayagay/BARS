<script>
    import { Timestamp, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
    import { db, storage } from "$lib/firebase/client.js"
    import Announcement from './Announcement.svelte';
	import { onMount } from "svelte";
	import { listAll, ref } from "firebase/storage";
	import { Circle } from "svelte-loading-spinners";

    onMount(()=>{
        getAnnouncements();
    })
    async function getAnnouncements(){
        let announcements = [];
        const querySnapshot = await getDocs(query(collection(db, "announcements"), orderBy("datePosted", "desc")));
        querySnapshot.docs.forEach((doc)=>{
            const datePosted = doc.data().datePosted
            if(new Timestamp(datePosted.seconds, datePosted.nanoseconds).toMillis() >= (Timestamp.now().toMillis() - 2592000000)){
                announcements = [...announcements, {...doc.data(), announcementId: doc.id}];
            } else {
                console.log(`This announcement is posted ${Math.round(
                    (Timestamp.now().toMillis() - (new Timestamp(datePosted.seconds, datePosted.nanoseconds).toMillis())) / 86400000)
                } days ago`)
            }
        })
        console.log(announcements)
        return announcements
    }

</script>

<svelte:head>
    <title>Homepage - Announcements | B.A.R.S.</title>
</svelte:head>

<main class="w-full h-full flex flex-col justify-start gap-2">
    <p class="w-full text-center text-lg font-bold">Announcements</p>
    <section class="overflow-y-auto overflow-x-hidden lg:w-full h-[80vh] lg:max-h-[80vh] flex flex-col gap-10 pb-4 px-4">
        {#await getAnnouncements()}
            <div class="w-full h-[70vh] flex flex-col items-center justify-center">
                <Circle />
                <p class="">Loading Announcements...</p>
            </div>
        {:then announcements} 
            {#if announcements.length !== 0}
                <Announcement {announcements}/>
            {:else}
                <div class="w-full lg:w-full h-full lg:h-[300px] flex items-center justify-center">
                    <p class="font-semibold opacity-60">Nothing to show for now</p>
                </div>
            {/if}
        {/await}
    </section>
</main>

