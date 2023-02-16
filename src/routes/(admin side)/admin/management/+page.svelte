<script>
    import { userStore, currentPage } from "$lib/stores.js";
    import { goto } from "$app/navigation"
    import {onMount} from "svelte"
	import ManagementHeader from "./ManagementHeader.svelte";
	import AnnouncementPage from "./make-announcement/AnnouncementPage.svelte";
	import DocumentsListManagerMainPage from "./documents-list-manager/DocumentsListManagerMainPage.svelte";


    onMount(()=>{
        if(!$userStore){
            goto("../admin")
        }
    })

    $currentPage = 2;

    let managementPage = 0;

    function navigate(event) {
        managementPage = event.detail.index;
    }
</script>

<main class="w-full h-screen py-6">
    <section class="w-full {managementPage === 1 ? "min-h-[90%] h-full" : "h-max"} bg-neutral rounded-xl">
        <ManagementHeader  {managementPage} on:switchTab={navigate}/>

        <div class="w-full h-full bg-neutral min-h-screen flex justify-center pb-[5vh]">
            <div class="w-[90%] h-full bg-base-100 flex justify-center border-[1px] border-base-300 rounded-lg">
                <AnnouncementPage  {managementPage} />
                <DocumentsListManagerMainPage {managementPage} />
            </div>
        </div>
    </section>
</main>