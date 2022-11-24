<script>
	import InfoForm from "$lib/components/InfoForm.svelte";

    let doculist = [
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

    let lastNameValid;

    function submitHandler(event){
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        
        const {documents:_, ...info} = data; //destructuring
        const documents = formData.getAll("documents");
        if(documents.length == 0) alert("Please choose a document")
        // console.log(documents)
        const doclistReq = doculist.filter((document) => documents.includes(document.id))
        // console.log(doclistReq)
    }

    function resetHandler(event){
        const form = event.target;
        form.reset();
    }

</script>


<section class="py-6 px-4 lg:px-0">
    <form class="form-control bg-neutral p-4 grid grid-cols-1 lg:grid-cols-2 rounded-lg gap-6" on:submit|preventDefault={submitHandler} on:reset={resetHandler}>

        <InfoForm />

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

        <section class="flex gap-3">
            <button type="submit"
                class="btn btn-primary"
                
                
                >
                Validate
            </button>
            <button type="reset"
                class="hover:underline hover:underline-offset-2">
                Clear Form
            </button>
        </section>

    </form>
</section>