<script>
	import { each } from "svelte/internal";


    export let doclistReq;

</script>

<section class="flex flex-col">
    <p>Please submit the following requirements</p>
    {#each doclistReq as document}
        <p>{document.name}</p>
        {#each document.requirements as requirement}
            <p>{requirement.requirement}</p>
            <input type="file" name="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" />
        {/each}
    {/each}

</section>

