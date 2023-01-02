<script>
    import { adminUser } from '$lib/stores.js'
    import {goto} from '$app/navigation';
    import { onMount } from "svelte";

    onMount(() => {
        if($adminUser === null){
            goto("../admin")
        }
    })
</script>

dashboard