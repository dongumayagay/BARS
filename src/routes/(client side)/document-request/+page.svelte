<script>
    import InfoForm from "$lib/components/InfoForm.svelte";
    import DocumentsList from "./DocumentsList.svelte";
    import FileUpload from "./FileUpload.svelte";
    import Confirm from "./Confirm.svelte";
    // import AfterSubmit from "./AfterSubmit.svelte";
    import { db,  storage } from "$lib/firebase/client.js";
    import { doc, Timestamp, collection, addDoc } from "firebase/firestore";
    import { ref, uploadBytes } from "firebase/storage";
    import { goto } from "$app/navigation";

    // let requestCompleted = false;
    let page = 1;

    // let requestId = "";

    let documentRequest = {}

    function nextHandler(event) {
        documentRequest = Object.assign(documentRequest, event.detail)
        page += 1;
    }

    $: console.log(documentRequest)
    async function submitToDatabase(){
        try {
                const documentRequestRef = await addDoc(collection(db, 'documentRequests'),{
                    lastName: documentRequest.contactInfo.lastName,
                    firstName: documentRequest.contactInfo.firstName,
                    middleName: documentRequest.contactInfo.middleName,
                    completeAddress: documentRequest.contactInfo.address,
                    contactNo: documentRequest.contactInfo.contactNo,
                    birthDate: documentRequest.contactInfo.birthdate,
                    email: documentRequest.contactInfo.email,
                    dateAdded: Timestamp.now(),
                    docsRequested: documentRequest.documentsRequestList,
                    docPurpose: documentRequest.contactInfo.purpose,
                    status: "pending"
                })

                const fileUploadPromises = documentRequest.filesToUpload.map((value)=>{
                    const pathName = "documentRequestsFiles/" + documentRequestRef.id + "/" + value.requestedDocumentName + "/" + value.requirementName + "." + value.file[0].type.split('/')[1];
                    const storageReference =  ref(storage, pathName);

                    return uploadBytes(storageReference, value.file[0]);
                    // return pathName;
                })

                // console.log(fileUploadPromises);
                const fileUploadPromisesResult = await Promise.all(fileUploadPromises)

                console.log(fileUploadPromisesResult)
                alert("Your request have been submitted \n\nYou will now be redirected to this request's tracker")

                console.log(documentRequestRef.id)
                goto('./document-request/' + documentRequestRef.id );




                    // const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890QWERTYUIOPLKJHGFDSAZXCVBNM9876543210";

                // // requesttId Generator
                // for(let index = 0; index < 9; index++){
                //     if(requestId.length <= 11) {
                //         let modulus = index % 3;
                //         if(modulus == 0 && index != 0){
                //             requestId += "-"
                //         }
                //         requestId += letters.charAt(Math.floor(Math.random() * letters.length));
                //     }
                // }

                // for (const fileToUpload of documentRequest.filesToUpload){
                //     const pathName = "documentRequestsFiles/" + requestId + "/" + fileToUpload.requestedDocumentName + "/" + fileToUpload.requirementName + "/" + fileToUpload.file[0].name;
                //     const storageReference =  ref(storage, pathName);

                //     await uploadBytes(storageReference, fileToUpload.file[0])
                //     .then((snapshot) => {
                //         console.log('Uploaded a blob or file!');
                //     });
                // }

                // await setDoc(doc(firestore, "documentRequests", requestId), {
                    // lastName: documentRequest.contactInfo.lastName,
                    // firstName: documentRequest.contactInfo.firstName,
                    // middleName: documentRequest.contactInfo.middleName,
                    // completeAddress: documentRequest.contactInfo.address,
                    // contactNo: documentRequest.contactInfo.contactNo,
                    // birthDate: documentRequest.contactInfo.birthdate,
                    // email: documentRequest.contactInfo.email,
                    // dateAdded: Timestamp.now(),
                    // docsRequested: documentRequest.documentsRequestList,
                    // docPurpose: documentRequest.contactInfo.purpose
                // })

                
                // documentRequestRef.id
                // console.log('request successfully added to the database' + requestId)                
                // requestCompleted = true;
            } catch (error) {
                const errorMessage = error.errorMessage;
            }
    }

</script>

<svelte:head>
    <title>Document Request | B.A.R.S.</title>
</svelte:head>

<div class="p-3 flex flex-col items-center gap-4">
    <!-- {#if !requestCompleted} -->
        <ul class="steps lg:w-[75%]">
            <li class="step font-semibold" class:step-success={page >= 0}>Contact Info</li>
            <li class="step {page >= 1 ? "step-success text-accent font-semibold": "text-black/50"}">Documents to Request</li>
            <li class="step {page >= 2 ? "step-success text-accent font-semibold": "text-black/50"}">Upload Requirements</li>
            <li class="step {page === 3 ? "step-success text-accent font-semibold": "text-black/50"}">Confirm</li>
        </ul>
        
        <div  class="w-[90%] lg:w-[45%] p-4 lg:px-10 bg-neutral rounded-xl flex flex-col justify-center shadow-xl gap-3" class:hidden={page !== 0}>
            <InfoForm on:next={nextHandler}/>
        </div>
        
        <div class="w-[95%] lg:w-[45%] p-4 bg-neutral rounded-xl flex justify-start shadow-xl" class:hidden={page !== 1}>
            <DocumentsList on:next={nextHandler} on:back={()=>page -= 1 }/>
        </div>

        <div class="w-[95%] lg:w-[45%] p-4 lg:px-6 bg-neutral rounded-xl flex justify-center shadow-xl" class:hidden={page !== 2}>
            <FileUpload listOfDocumentsRequested={documentRequest?.documentsRequestList??[]} on:next={nextHandler} on:back={()=>page -= 1 }/>
            
        </div>

        <div class:hidden={page !== 3}>
            <div class="w-[95%] lg:w-max p-4 lg:px-6 bg-neutral rounded-xl flex justify-center shadow-xl" >
                <Confirm 
                    {documentRequest}
                    on:backToPageZero = {() => page = 0}
                    on:backToPageOne = {() => {
                        page = 1; 
                        // requirementsFiles = [];
                    }}
                    on:submit = {submitToDatabase}
                />
            </div>
            
        </div>
    <!-- {:else}
        <section>
            <AfterSubmit {requestId} />
    
        </section>
    {/if} -->
</div>

