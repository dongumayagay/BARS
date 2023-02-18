<script>
    import { userStore } from '$lib/stores.js';
    import { db, storage } from '$lib/firebase/client.js';
	import { onSnapshot, query, where, collection, orderBy, updateDoc, Timestamp, doc } from 'firebase/firestore';
    import { deleteObject, ref, uploadBytes } from "firebase/storage"
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
        // console.log(event.detail.announcement)
        announcementDetailsToEdit = Object.assign(announcementDetailsToEdit, event.detail.announcement);
        showEditor = true;
    }

    function cancelEditorHandler(event){
        // console.log(event.detail.announcement)
        announcementDetailsToEdit = {};
        showEditor = false;
    }
    

    async function updateHandler(event){
        try {
            const announcementDetails = event.detail.announcement;
            const deletedFiles = event.detail.filePathsDeleted;
            const filesToUpload = event.detail.filesToUpload;
            // console.log(event.detail.announcement.title)
            // console.log([...event.detail.filePathsDeleted])
            // console.log([...event.detail.filesToUpload])

            const announcementUpdateRef = await updateDoc(doc(db, "announcements", announcementDetails.id), {
                content: announcementDetails.content,
                datePosted: Timestamp.now(),
                title: announcementDetails.title
            })

            // console.log(announcementUpdateRef)

            const deleteUploadedFilesRef = deletedFiles.map((item)=>{
                return deleteObject(ref(storage, item.filePath));
            })

            const uploadFilesRef = filesToUpload.map((item)=>{
                const filePath = "announcementFiles/" + announcementDetails.id + "/" + item.file.name;
                return uploadBytes(ref(storage, filePath), item.file);
            })

            const deleteFilesResult = await Promise.all(deleteUploadedFilesRef);
            const uploadFilesResult = await Promise.all(uploadFilesRef);
            console.log(announcementUpdateRef)
            console.log(deleteFilesResult)
            console.log(uploadFilesResult)
            
        } catch (error) {
            alert(error.message)
        }
    }

</script>


<section class="w-full h-full flex flex-col p-4 gap-6 rounded-lg shadow-lg" class:hidden={managementPage !== 0}>
    {#if !showEditor}
    <AnnouncementMainPage {postedAnnouncements} {page} on:next={()=>page = 1} on:edit={showEditorHandler}/>
    <AnnouncementMaker {page} on:close={()=>page = 0}/>
    {:else}
    <AnnouncementEditor announcement={announcementDetailsToEdit} on:cancel={cancelEditorHandler} on:update={updateHandler}/>
    {/if}
</section>

