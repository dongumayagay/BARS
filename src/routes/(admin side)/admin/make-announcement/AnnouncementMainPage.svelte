<script>
    import {createEventDispatcher } from "svelte";
	import Announcement from './Announcement.svelte';

    export let postedAnnouncements;
    export let page;

    const dispatch = createEventDispatcher();
</script>

<div class="w-full flex flex-col gap-2" class:hidden={page!==0}>
    <button class="w-max btn btn-primary flex gap-2" on:click={()=>dispatch("next")}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <p>Post an announcement</p>
    </button>
    <div>
        {#if postedAnnouncements.length !== 0}
            <Announcement announcements={postedAnnouncements}/> 
        {/if}
    </div>
</div>