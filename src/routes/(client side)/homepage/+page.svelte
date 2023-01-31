<script>
    import { collection, onSnapshot } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
    import Announcement from './Announcement.svelte';

    let announcements = []
    
    const announcementsFetcher = onSnapshot(collection(db, "announcements"), (querySnapshot)=>{
        announcements = [];
        querySnapshot.forEach((doc)=>{
            console.log(doc.data())
            announcements = [...announcements, {
                ...doc.data()
            }]
        })
    })

</script>

<svelte:head>
    <title>Homepage - Announcements | B.A.R.S.</title>
</svelte:head>

<section class=" lg:overflow-y-auto lg:max-h-[80vh] lg:w-[70%] flex flex-col gap-10 p-4">
    {#if announcements.length !== 0}
        <Announcement {announcements}/>
    {:else}
        <div class="w-full h-screen lg:h-[300px] flex items-center justify-center">
            <p class="font-semibold opacity-60">Nothing to show for now</p>
        </div>
    {/if}
</section>

