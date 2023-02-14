<script>
    import { userStore } from '$lib/stores.js';
    import { db } from '$lib/firebase/client.js';
	import { onSnapshot, query, where, collection, orderBy } from 'firebase/firestore';
	import AnnouncementMainPage from './components/AnnouncementMainPage.svelte';
	import AnnouncementMaker from './components/AnnouncementMaker.svelte';

    export let managementPage;

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


<section class="w-full h-full flex flex-col p-4 gap-6 rounded-lg shadow-lg" class:hidden={managementPage !== 0}>
    <AnnouncementMainPage {postedAnnouncements} {page} on:next={()=>page = 1}/>
    <AnnouncementMaker {page} on:close={()=>page = 0}/>
</section>

