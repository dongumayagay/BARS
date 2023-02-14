<script>
    import { userStore, currentPage } from "$lib/stores.js";
    import { goto } from "$app/navigation"
    import {onMount} from "svelte"
	import ManagementHeader from "./ManagementHeader.svelte";
	import AnnouncementPage from "./make-announcement/AnnouncementPage.svelte";


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

<!-- <main class="w-full max-h-screen flex flex-col items-center p-4 px-1">
	<ManagementHeader  {managementPage} on:switchTab={navigate}/>

	<div class="w-full h-full bg-neutral min-h-screen flex justify-center pb-[5vh]">
		<div class="w-[90%] bg-base-100 flex justify-center border-[1px] border-base-300 rounded-lg">
            <AnnouncementPage  {managementPage} />
		</div>
	</div>
</main> -->

<main class="w-full max-h-screen h-max py-6">
    <section class="w-full h-full bg-neutral rounded-xl">
        <ManagementHeader  {managementPage} on:switchTab={navigate}/>

        <div class="w-full h-full bg-neutral min-h-screen flex justify-center pb-[5vh]">
            <div class="w-[90%] bg-base-100 flex justify-center border-[1px] border-base-300 rounded-lg">
                <AnnouncementPage  {managementPage} />
            </div>
        </div>
    </section>
</main>