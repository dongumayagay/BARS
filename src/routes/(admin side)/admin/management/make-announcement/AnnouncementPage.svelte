<script>
    import { userStore } from '$lib/stores.js';
    import { db, storage } from '$lib/firebase/client.js';
	import { onSnapshot, query, where, collection, orderBy, updateDoc, Timestamp, doc, deleteDoc } from 'firebase/firestore';
    import { deleteObject, listAll, ref, uploadBytes } from "firebase/storage"
	import AnnouncementMainPage from './components/AnnouncementMainPage.svelte';
	import AnnouncementMaker from './components/AnnouncementMaker.svelte';
	import AnnouncementEditor from './components/AnnouncementEditor.svelte';
	import { onMount } from 'svelte';

    export let managementPage;

    onMount(()=>{
        if(!$userStore){
            return;
        }
       const unsub =  onSnapshot(query(collection(db, "announcements"), where("postedBy", "==", $userStore.email), orderBy("datePosted", "desc")), (querySnapshot)=>{
            postedAnnouncements = querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id}))
            // console.log("realtimeListener Triggered")
        })
        return()=>{
            unsub();
        }
    })

    let page = 0;
    let showEditor = false;

    let postedAnnouncements = [];
    let announcementDetailsToEdit = {};

    function showEditorHandler(event){
        announcementDetailsToEdit = Object.assign(announcementDetailsToEdit, event.detail.announcement);
        showEditor = true;
    }

    function cancelEditorHandler(){
        announcementDetailsToEdit = {};
        showEditor = false;
    }
    

    async function updateHandler(event){
        try {
            const announcementDetails = event.detail.announcement;
            const deletedFiles = event.detail.filePathsDeleted;
            const filesToUpload = event.detail.filesToUpload;
            const announcementUpdateRef = await updateDoc(doc(db, "announcements", announcementDetails.id), {
                content: announcementDetails.content,
                datePosted: Timestamp.now(),
                title: announcementDetails.title,
                hasFiles: (filesToUpload.length > 0 ? true : announcementDetails.hasFiles)
            })
            const deleteUploadedFilesRef = deletedFiles.map((item)=>{
                return deleteObject(ref(storage, item.filePath));
            })
            const uploadFilesRef = filesToUpload.map((item)=>{
                const filePath = "announcementFiles/" + announcementDetails.id + "/" + item.file.name;
                return uploadBytes(ref(storage, filePath), item.file);
            })
            const deleteFilesResult = await Promise.all(deleteUploadedFilesRef);
            const uploadFilesResult = await Promise.all(uploadFilesRef);
            announcementDetailsToEdit = {};
            showEditor = false;
        } catch (error) {
            alert(error.message)
        }
    }

    async function deleteHandler(event){
        try {
            const deleteAnnouncementDoc = await deleteDoc(doc(db, "announcements", event.detail.id))
            listAll(ref(storage, "announcementFiles/" + event.detail.id + "/"))
            .then((files)=>{
                files.items.forEach((file)=>{
                   deleteObject(ref(storage, file.fullPath));
                })
            })
            announcementDetailsToEdit = {};
            showEditor = false;
        } catch (error) {
            alert(error.message)
        }
    }

</script>


<section class="w-full h-full flex flex-col p-4 gap-6 rounded-lg shadow-lg" class:hidden={managementPage !== 0}>
    {#if !showEditor}
    <AnnouncementMainPage {postedAnnouncements} {page} on:next={()=> page = 1} on:edit={showEditorHandler}/>
    <AnnouncementMaker {page} on:close={()=> page = 0}/>
    {:else}
    <section class="w-full h-full overflow-auto">
        <AnnouncementEditor announcement={announcementDetailsToEdit} on:cancel={cancelEditorHandler} on:update={updateHandler} on:delete={deleteHandler}/>
    </section>
    {/if}
</section>

