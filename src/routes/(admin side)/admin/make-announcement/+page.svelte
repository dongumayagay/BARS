<script>
    import { userStore, currentPage } from '$lib/stores.js'
    import { db } from '$lib/firebase/client.js'
    import {goto} from '$app/navigation';
    import { onMount } from "svelte";
	import { onSnapshot, query, where, collection } from 'firebase/firestore';
	import Announcement from './Announcement.svelte';

    onMount(()=>{
        if(!$userStore){
            goto("../admin")
        }

    })

    let postedAnnouncements = [];

    const postedAnnouncementsFetcher = onSnapshot(query(collection(db, "announcements"), where("postedBy", "==", $userStore?.email??[])), (querySnapshot)=>{
        postedAnnouncements = [];
        querySnapshot.forEach((doc)=>{
            postedAnnouncements = [...postedAnnouncements, {
                ...doc.data()
            }]
        })
    })
</script>

<main class="w-full h-screen pt-6">
    <section class="w-full min-h-[450px] bg-neutral flex flex-col p-6 gap-6 rounded-lg shadow-lg">
        <button class="w-max btn btn-primary flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p>Post an announcement</p>
        </button>
        {#if postedAnnouncements.length !== 0}
            <Announcement announcements={postedAnnouncements}/> 
        {/if}
    </section>
</main>
