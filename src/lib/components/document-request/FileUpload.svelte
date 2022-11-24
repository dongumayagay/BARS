<script>
	import { each } from "svelte/internal";


    export let doclistReq;

</script>

<section class="flex flex-col items-center justify-center">
    <p>Please submit the following requirements</p>
    <div class="overflow-y-auto max-h-[60vh] flex flex-col gap-3 ">
        {#each doclistReq as document}
        <div class="pb-2 border-b-4 border-primary">
            <div>
                <p class=" font-semibold">{document.name}</p>
            </div>
            <div class="flex flex-col gap-4">
                {#each document.requirements as requirement}
                <div class="w-[50vw] flex flex-col items-center gao-2">
                    <p>{requirement.requirement}</p>
                    <input type="file" 
                        accept=".jpg, .jpeg .png, .svg, .webp" 
                        name="file" 
                        class="file-input file-input-bordered file-input-primary w-full max-w-xs" 
                    />
                </div>
                {/each}
            </div>
        </div>
        {/each}
    </div>

</section>

