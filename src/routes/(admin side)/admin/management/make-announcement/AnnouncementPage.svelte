<script>
    import { userStore } from '$lib/stores.js';
    import { db } from '$lib/firebase/client.js';
	import { onSnapshot, query, where, collection, orderBy } from 'firebase/firestore';
	import AnnouncementMainPage from './components/AnnouncementMainPage.svelte';
	import AnnouncementMaker from './components/AnnouncementMaker.svelte';
	import AnnouncementEditor from './components/AnnouncementEditor.svelte';

    export let managementPage;

    let page = 0;
    let showEditor = false;

    let postedAnnouncements = [];
    let announcementDetailsToEdit = {};

    const postedAnnouncementsFetcher = onSnapshot(query(collection(db, "announcements"), where("postedBy", "==", $userStore?.email??[]), orderBy("datePosted", "desc")), (querySnapshot)=>{
        postedAnnouncements = [];
        querySnapshot.forEach((doc)=>{
            postedAnnouncements = [...postedAnnouncements, {
                ...doc.data(),
                id: doc.id,
            }]
        })
    })

    function showEditorHandler(event){
        console.log(event.detail.announcement)
        announcementDetailsToEdit = Object.assign(announcementDetailsToEdit, event.detail.announcement);
        showEditor = true;
    }

</script>


<section class="w-full h-full flex flex-col p-4 gap-6 rounded-lg shadow-lg" class:hidden={managementPage !== 0}>
    {#if !showEditor}
    <AnnouncementMainPage {postedAnnouncements} {page} on:next={()=>page = 1} on:edit={showEditorHandler}/>
    <AnnouncementMaker {page} on:close={()=>page = 0}/>
    {:else}
    <AnnouncementEditor announcement={announcementDetailsToEdit}/>
    {/if}
</section>

