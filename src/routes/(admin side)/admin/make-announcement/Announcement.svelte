<script>
	import { Timestamp } from "firebase/firestore";
    
    export let announcements;
</script>

<div class="w-full flex flex-col gap-2">
    <p>Your posts:</p>
    {#each announcements as announcement}
        <section class="bg-base-100 w-full lg:w-full p-4 flex flex-col rounded-xl shadow-lg">
            <div class="w-full pb-4 flex flex-col border-b-[2px] border-neutral">
                <p class="text-xs lg:text-sm">{new Timestamp(announcement.datePosted.seconds, announcement.datePosted.nanoseconds).toDate()}</p>
                <p class="text-xs lg:text-sm">Posted by: {announcement?.postedBy??[]}</p>
            </div>
            <p class="w-full text-center p-4 font-bold text-xl lg:text-2xl">{announcement?.title??[]}</p>
            <p class="w-full text-center text-sm lg:text-md">{announcement?.content??[]}</p>
        </section>
    {/each}
</div>