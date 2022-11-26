<script>
    import {createEventDispatcher} from "svelte";
    const documentsList = [
            {
                id: "1",
                name: "Document 1",
                requirements: [
                    {requirement: "requirement1"},
                    {requirement: "requirement2"},
                ]
            },
            {
                id: "2",
                name: "Document 2",
                requirements: [
                    {requirement: "requirement1"},
                    {requirement: "requirement2"},
                    {requirement: "requirement3"}
                ]
            },
            {
                id: "3",
                name: "Document 3",
                requirements: [
                    {requirement: "requirement1"}
                ]
            },
            {
                id: "4",
                name: "Document 4",
                requirements: [
                    {requirement: "requirement1"},
                    {requirement: "requirement2"},
                    {requirement: "requirement3"}
                ]
            },
        ]
    let documentsRequestList = []
    const dispatch = createEventDispatcher()
    function submitHandler() {
        dispatch("next", {
            documentsRequestList
        })
    }
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" 
			integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" 
			crossorigin="anonymous" referrerpolicy="no-referrer" />
</svelte:head>


<form class="w-full flex flex-col items-center justify-start gap-4" on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()}>
    <div class="w-full flex justify-start">
        <button type="button" class="lg:fixed lg:left-[15%] lg:bottom-[55%] btn btn-neutral p-3 lg:p-4 flex items-center gap-2 hover:bg-neutral group hover:border-none" on:click={()=>dispatch("back")}>
            <i class="fa-solid fa-arrow-left"></i>
            <p class=" group-hover:underline group-hover:underline-offset-2">Go Back</p>
        </button>
    </div>
    <div class="w-full ">
        <p class=" text-center  font-bold">Documents List</p>
    </div>
    <p class=" text-center">Kindly check the box of the documents you need to request</p>
    <div class="flex flex-col items-start w-[95%] gap-3">
        {#each documentsList as document}
            <div class="w-full flex flex-col gap-2">
                <div class="flex items-center justify-center gap-3 ">
                    <input type="checkbox" 
                        value={document}
                        name="documents"
                        class="checkbox checkbox-primary"
                        bind:group={documentsRequestList} 
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
    <section class="w-full pl-3 pt-5 flex justify-start gap-1">
        <button type="submit" class="btn btn-primary flex lg:gap-1" disabled={documentsRequestList.length === 0}>
            <p>Next</p> 
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button type="reset" class="btn btn-ghost hover:bg-neutral hover:underline hover:underline-offset-2" disabled={documentsRequestList.length === 0}>Clear Form</button>
    </section>
</form>