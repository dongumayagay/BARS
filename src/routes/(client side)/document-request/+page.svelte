<script>
    import InfoForm from "$lib/components/InfoForm.svelte"
    import DocumentsList from "./DocumentsList.svelte"
    import FileUpload from "./FileUpload.svelte"

    let page = 1;
    let documentRequest = {}
    let requirementsFiles = []
    function nextHandler(event) {
        documentRequest = Object.assign(documentRequest, event.detail)
        if(!!event.detail.filesToUpload){
            requirementsFiles = {...requirementsFiles, ...event.detail.filesToUpload}
            console.log(requirementsFiles)
        }
        page += 1;
    }
</script>

<svelte:head>
    <title>Document Request | B.A.R.S.</title>
    
</svelte:head>

<div class="p-3 flex flex-col items-center gap-4">
    <ul class="steps lg:w-[75%]">
        <li class="step font-semibold" class:step-success={page >= 0}>Contact Info</li>
        <li class="step {page >= 1 ? "step-success text-accent font-semibold": "text-black/50"}">Documents to Request</li>
        <li class="step {page >= 2 ? "step-success text-accent font-semibold": "text-black/50"}">Upload Requirements</li>
        <li class="step {page >= 3 ? "step-success text-accent font-semibold": "text-black/50"}">Confirm</li>
    </ul>
    
    <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex justify-center shadow-xl" class:hidden={page !== 0}>
        <InfoForm on:next={nextHandler}/>
    </div>
    
    <div class="w-[95%] lg:w-[45%] p-4 bg-neutral rounded-xl flex justify-start shadow-xl" class:hidden={page !== 1}>
        <DocumentsList on:next={nextHandler} on:back={()=>page -= 1 }/>
    </div>

    <div class="w-[95%] lg:w-[45%] p-4 lg:px-6 bg-neutral rounded-xl flex justify-center shadow-xl" class:hidden={page !== 2}>
        <FileUpload doclistReq={documentRequest?.documentsRequestList??[]} on:next={nextHandler} on:back={()=>page -= 1 }/>
    </div>
</div>







