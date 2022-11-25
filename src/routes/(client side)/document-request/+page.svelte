<script>
	import InfoForm from "$lib/components/InfoForm.svelte";
    import DocumentsList from "$lib/components/document-request/DocumentsList.svelte"
	import FileUpload from "$lib/components/document-request/FileUpload.svelte";
	import RequestInfo from "../../../lib/components/document-request/RequestInfo.svelte";

    let formValidated = false;
    let filesCompleted = false;
    let showUploadModal = false;
    let showRequestInfo = false;

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

    let requestData;
    let documents;
    let doclistReq;
    let requirementsFiles;

    function submitHandler(event){
        const form = event.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        const {documents:_, ...info} = data; //destructuring
        documents = formData.getAll("documents");
        requestData = info;
        
        if(!formValidated && !filesCompleted){
            if(documents.length == 0){ 
                alert("Please choose a document")
            }
            else if(documents.length > 0){
                doclistReq = doculist.filter((document) => documents.includes(document.id))
                formValidated = true;
                console.log(requestData.firstName)
                console.log(doclistReq)
            }

        } else if(formValidated && !filesCompleted) {
            let requirementsCount = 0;
            let filesCount = 0;
            const files = formData.getAll("file")

            for (const document of doclistReq){
                requirementsCount += document.requirements.length;
            }

            for (const file of files){
                if(file.size != 0){
                    filesCount++
                }
            }

            if(requirementsCount != filesCount){
                alert("Please upload all of the requrements")
            } else {
                filesCompleted = true;
                requirementsFiles = files;
                console.log(requirementsFiles);
            }
        }
        
    }

    function resetHandler(event){
        const form = event.target;
        form.reset();
        formValidated = false;
    }
    

</script>



<section class="py-6 px-4 lg:px-0">
    <form class="form-control bg-neutral p-4 grid grid-cols-1 lg:grid-cols-2 rounded-lg gap-6" on:submit|preventDefault={submitHandler} on:reset={resetHandler}>

        <InfoForm />

        <DocumentsList {doculist}/>

        {#if showUploadModal}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <section class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/50" on:click|self={()=>showUploadModal=false}>
                <section class="h-max max-h-[80vh] w-[60vw] bg-neutral flex flex-col items-center justify-start p-3 rounded-2xl shadow-xl gap-2">
                    <button title="Close and edit form" type="button" class="w-full flex justify-end" on:click={()=>{showUploadModal = false; formValidated=false}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                    </button>
                    <FileUpload {doclistReq}/>
                    <div class="flex gap-3">
                        <button type="submit" class="btn btn-primary">Check Files</button>
                        {#if !filesCompleted}
                            <button type="button" class="btn btn-success" disabled>Next</button>
                        {:else}
                            <button type="button" 
                                on:click={()=>{
                                    showUploadModal = false
                                    showRequestInfo = true
                                }}
                                class="btn btn-success"
                            >Next</button>
                        {/if}
                    </div>
                </section>
            </section>
        {/if}

        {#if showRequestInfo}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <section class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/50" on:click|self={()=>showRequestInfo=false}>
                <section class="h-max max-h-[80vh] w-[80vw] lg:w-max lg:p-4 bg-neutral flex flex-col items-center justify-start p-3 rounded-2xl shadow-xl gap-2">
                    <RequestInfo {requestData} {doclistReq}/>
                </section>
            </section>
        {/if}

        <section class="flex gap-3">
            {#if !formValidated}
                <button type="submit"
                    class="btn btn-primary"
                    >
                    Validate
                </button>
            {:else}
                <button type="button"
                    class="btn btn-success"
                    on:click={()=>showUploadModal = true}
                    >
                    Next
                </button>
            {/if}
            <button type="reset"
                class="hover:underline hover:underline-offset-2">
                Clear Form
            </button>
        </section>

    </form>
</section>