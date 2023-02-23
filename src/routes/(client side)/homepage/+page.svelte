<script>
    import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
    import { db, storage } from "$lib/firebase/client.js"
    import Announcement from './Announcement.svelte';
	import { onMount } from "svelte";
	import { listAll, ref } from "firebase/storage";

    onMount(()=>{
        getAnnouncements();
    })
    let announcements = []
    async function getAnnouncements(){
        const querySnapshot = await getDocs(query(collection(db, "announcements"), orderBy("datePosted", "desc")));
        querySnapshot.docs.map((doc)=>{
            announcements = [...announcements, {...doc.data(), announcementId: doc.id}]
        })
    }

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

