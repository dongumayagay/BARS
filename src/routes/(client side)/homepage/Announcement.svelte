<script>
	import { Timestamp } from "firebase/firestore";
    
    export let announcements;
</script>


{#each announcements as announcement}
    <section class="bg-neutral w-full lg:w-full p-4 flex flex-col rounded-xl shadow-lg">
        <div class="w-full pb-4 flex flex-col border-b-[1px] border-primary">
            <p class="text-xs lg:text-sm">{new Timestamp(announcement.datePosted.seconds, announcement.datePosted.nanoseconds).toDate()}</p>
            <p class="text-xs lg:text-sm">Posted by: {announcement?.postedBy??[]}</p>
        </div>
        <p class="w-full text-center p-4 font-bold text-xl lg:text-2xl">{announcement?.title??[]}</p>
        <p class="w-full text-center text-sm lg:text-md">{announcement?.content??[]}</p>
    </section>
{/each}