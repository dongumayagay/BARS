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
        {#if !!dataToView.docPurpose}
            <p class="font-semibold text-[14px]">Purpose of the Documents</p>
            <p class="text-[14px]">- {dataToView.docPurpose}</p>
        {:else}
            <p class="font-semibold text-[14px]">Purpose of the Documents</p>
            {#each dataToView.docsRequested??[] as requestedDocument}
            <div class="flex flex-col items-center">
                <p class="text-[14px] underline underline-offset-2">{requestedDocument.name}</p>
                {#each requestedDocument.purposes??[] as purpose}
                    <div class="flex justify-center items-center gap-2">
                        <i class="fa-solid fa-circle text-[8px]"></i>
                        <p class="text-[14px]">{(purpose.name === "others" ? purpose.others : purpose.name)}</p>
                    </div>
                {/each}
            </div>
            {/each}
        {/if}
    </div>
</section>