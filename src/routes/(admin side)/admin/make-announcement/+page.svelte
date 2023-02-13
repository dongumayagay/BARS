<script>
    import { userStore, currentPage } from '$lib/stores.js'
    import { db } from '$lib/firebase/client.js'
    import {goto} from '$app/navigation';
    import { onMount } from "svelte";
	import { onSnapshot, query, where, collection, orderBy } from 'firebase/firestore';
	import AnnouncementMainPage from './AnnouncementMainPage.svelte';
	import AnnouncementMaker from './AnnouncementMaker.svelte';

    onMount(()=>{
        if(!$userStore){
            goto("../admin")
        }

    })

    $: $currentPage = 2;

    let page = 0;

    let postedAnnouncements = [];

    const postedAnnouncementsFetcher = onSnapshot(query(collection(db, "announcements"), where("postedBy", "==", $userStore?.email??[]), orderBy("datePosted", "desc")), (querySnapshot)=>{
        postedAnnouncements = [];
        querySnapshot.forEach((doc)=>{
            postedAnnouncements = [...postedAnnouncements, {
                ...doc.data(),
                id: doc.id,
            }]
        })
    })
</script>

<main class="w-full h-screen pt-6">
    <section class="w-full min-h-[450px] bg-neutral flex flex-col p-6 gap-6 rounded-lg shadow-lg">
        <AnnouncementMainPage {postedAnnouncements} {page} on:next={()=>page = 1}/>
        <AnnouncementMaker {page} on:close={()=>page = 0}/>
    </section>
</main>
