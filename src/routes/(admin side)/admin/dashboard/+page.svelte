<script>
    import { userStore, currentPage } from '$lib/stores.js'
    import {goto} from '$app/navigation';
    import { onMount } from "svelte";

    
    onMount(()=>{   
        if(!$userStore){
            $currentPage = 0
            goto("../admin")
        }
    })
</script>

dashboard