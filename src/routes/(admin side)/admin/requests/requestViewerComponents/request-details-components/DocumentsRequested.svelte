<script>

export let dataToView
</script>

<p class="font-semibold">Documents Requested</p>
<div>
    {#each dataToView.docsRequested??[] as document}
        <div class="ml-5 flex items-center gap-2">
            <i class="fa-solid fa-circle text-[8px]"></i>
            <p>{document.name}</p>
        </div>
    {/each}
</div>