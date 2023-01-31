<script>
    import { userStore, currentPage } from '$lib/stores.js'
    import {goto} from '$app/navigation';
    import { onMount } from "svelte";

    onMount(()=>{
        if(!$userStore){
            $currentPage = 2
            goto("../admin")
        }

    })
</script>

<main class="w-full h-screen pt-6">
    <section class="w-full min-h-[450px] bg-neutral p-6">
        Post an announcement
    </section>
</main>
