<!-- <script>
	import InfoForm from "$lib/components/InfoForm.svelte";
    import DocumentsList from "$lib/components/document-request/DocumentsList.svelte";
	import FileUpload from "$lib/components/document-request/FileUpload.svelte";
	import RequestInfo from "../../../lib/components/document-request/RequestInfo.svelte";
    import { firestore, storage } from "$lib/firebase/client.js";
    import { collection, doc, setDoc, query, Timestamp } from "firebase/firestore"; 

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
    let requestId = "";

    async function dbSubmit(){
        // try {
        //     const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890QWERTYUIOPLKJHGFDSAZXCVBNM9876543210";

        //     // requesttId Generator
        //     for(let index = 0; index < 9; index++){
        //         if(requestId.length <= 11) {
        //             let modulus = index % 3;
        //             if(modulus == 0 && index != 0){
        //                 requestId += "-"
        //             }
        //             requestId += letters.charAt(Math.floor(Math.random() * letters.length));
        //         }
        //     }

        //     const docRef = doc(firestore, "docRequests", requestId);

        //     await setDoc(docRef, {
        //         lastName: requestData.lastName,
        //         firstName: requestData.firstName,
        //         middleName: requestData.middleName,
        //         address: requestData.address,
        //         email: requestData.email,
        //         birthdate: requestData.birthdate,
        //         age: requestData.age,
        //         phoneNo: requestData.contact,
        //         purpose: requestData.purpose,
        //         dateCreated: Timestamp.now(),
        //         status: "pending"
        //     }, requestId)
        //     .then(
        //         console.log('request successfully added to the database' + requestId)
        //     )
        // } catch (error) {
        //     const errorMessage = error.errorMessage
        //     console.log(errorMessage);
        // }
    }

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
        } else if (formValidated && filesCompleted){
            console.log("request submitting")
            dbSubmit()
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

        

        {#if showRequestInfo}
            <section class="fixed top-0 left-0 h-screen w-screen flex flex-col lg:flex-row items-center justify-center bg-black/50 gap-4" on:keypress={()=>{}} on:click|self={()=>showRequestInfo=false}>
                <section class="h-max max-h-[80vh] w-[80vw] lg:w-max lg:p-4 bg-neutral flex flex-col items-center justify-start p-3 rounded-2xl shadow-xl gap-2">
                    <RequestInfo {requestData} {doclistReq}/>
                </section>
                <section class="flex lg:flex-col gap-3">
                    <button type="button" class="btn btn-glass flex gap-2 shadow-lg" on:click={()=>{showRequestInfo=false; formValidated=false; filesCompleted=false}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                          </svg>
                          <p>Go back and Edit</p>
                    </button>
                    <button type="submit" class="btn btn-success flex gap-2 shadow-lg" >
                        <p>Submit</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                          </svg>
                          
                    </button>
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


{#if showUploadModal}
            <section class="fixed top-0 left-0 h-screen w-screen flex items-center justify-center bg-black/50" on:keypress={()=>{}} on:click|self={()=>showUploadModal=false}>
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
        {/if} -->

<script>
    import InfoForm from "$lib/components/InfoForm.svelte"
    import DocumentsList from "./DocumentsList.svelte"
    import FileUpload from "./FileUpload.svelte"

    let page = 1;
    let documentRequest = {}
    let requirementsFiles = []
    function nextHandler(event) {
        // console.log(event.detail)
        documentRequest = Object.assign(documentRequest, event.detail)
        // if(!!event.detail)
        // documentRequest = {...documentRequest, ...event.detail}
        page += 1;
    }
    $: console.log(JSON.stringify(documentRequest))
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
    
    <div  class="w-[90%] lg:w-[50%] p-4 lg:px-10 bg-neutral rounded-xl flex justify-center" class:hidden={page !== 0}>
        <InfoForm on:next={nextHandler}/>
    </div>
    
    <div class="w-[90%] lg:w-[50%] p-4 bg-neutral rounded-xl flex justify-center" class:hidden={page !== 1}>
        
        <DocumentsList on:next={nextHandler} on:back={()=>page -= 1 }/>
    </div>
        
    <div class:hidden={page !== 2}>
        
        <FileUpload doclistReq={documentRequest?.documentsRequestList??[]} on:next={nextHandler} on:back={()=>page -= 1 }/>
    </div>
</div>





