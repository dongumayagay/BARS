<script>
	import InfoForm from "$lib/components/InfoForm.svelte";

    let doculist = [
        {
            name: "Document 1",
            requirements: [
                {requirement: "requirement1"},
                {requirement: "requirement2"},
            ]
        },
        {
            name: "Document 2",
            requirements: [
                {requirement: "requirement1"},
                {requirement: "requirement2"},
                {requirement: "requirement3"}
            ]
        },
        {
            name: "Document 3",
            requirements: [
                {requirement: "requirement1"}
            ]
        },
        {
            name: "Document 4",
            requirements: [
                {requirement: "requirement1"},
                {requirement: "requirement2"},
                {requirement: "requirement3"}
            ]
        },
    ]
    
    let documents = [];

</script>


<section class="py-6 px-4 lg:px-0">
    <form class="form-control bg-neutral p-4 grid grid-cols-1 lg:grid-cols-2 rounded-lg gap-6">

        <InfoForm class=""/>

        <section class="flex flex-col items-center justify-start gap-6">
            <div>
                <p>Documents List</p>
            </div>
            <p>Kindly check the box of the documents you need to request</p>
            <div class="overflow-y-auto overflow-x-visible max-h-[400px] flex flex-col items-start w-[95%] gap-3">
                {#each doculist as document}
                    <div class="w-full flex flex-col gap-2">
                        <div class="flex items-center justify-center gap-3 ">
                            <input type="checkbox" 
                                value={document}
                                bind:group={documents} 
                                checked="checked" 
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
            <div class="flex flex-col items-center">
                <p>You Selected:</p>
                <div class="flex gap-2">
                    {#each documents as document, i}
                        <p class="p-2 bg-info text-white rounded-xl">{document.name}</p>
                    {/each}
                </div>
            </div>
        </section>

    </form>
</section>