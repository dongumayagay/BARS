<script>

    export let doculist ;
</script>

<section class="flex flex-col items-center justify-start gap-6">
    <div>
        <p class="font-bold">Documents List</p>
    </div>
    <p>Kindly check the box of the documents you need to request</p>
    <div class="overflow-y-auto overflow-x-visible max-h-[400px] flex flex-col items-start w-[95%] gap-3">
        {#each doculist as document}
            <div class="w-full flex flex-col gap-2">
                <div class="flex items-center justify-center gap-3 ">
                    <input type="checkbox" 
                        value={document.id}
                        name="documents"
                        class="checkbox checkbox-primary"
                         
                    />
                    <p class="w-full bg-primary p-2 rounded-xl">{document.name}</p>
                </div>
                <div class="flex flex-col items-start pl-14 gap-2">
                    {#each document.requirements as requirement}
                        <p>{requirement.requirement}</p>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    
</section>