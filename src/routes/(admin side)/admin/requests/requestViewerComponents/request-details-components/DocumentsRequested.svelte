<script>

export let dataToView
</script>

<section class="w-full flex flex-col items-center gap-2">
    <div class="w-full flex flex-col items-center">
        <p class="font-semibold">Documents Requested</p>
        {#each dataToView.docsRequested??[] as document}
            <div class="flex items-center gap-2">
                <i class="fa-solid fa-circle text-[8px]"></i>
                <p>{document.name}</p>
            </div>
        {/each}
    </div>
    <div class="w-full flex flex-col items-center gap-2">
        <p class="font-semibold">Purpose of the Documents</p>
        <p>- {dataToView.docPurpose}</p>
    </div>
</section>