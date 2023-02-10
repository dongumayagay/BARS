<script>
    import { userStore, currentPage } from '$lib/stores.js'
    import {goto} from '$app/navigation';
    import { onMount } from "svelte";

    onMount(()=>{   
        if(!$userStore){
            goto("../admin")
        }
    })

    $currentPage = 0;
</script>

dashboard