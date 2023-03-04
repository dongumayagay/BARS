<script>
    import { createEventDispatcher } from "svelte";
    import { addDoc, doc, Timestamp, updateDoc, collection, deleteDoc, query, where, getDoc, getDocs, orderBy } from "firebase/firestore"; 
    import { db, storage } from "$lib/firebase/client.js"
    import { sendEmail } from '$lib/utils';
	import NavigationButtons from "./requestViewerComponents/NavigationButtons.svelte";
	import RequestDetails from "./requestViewerComponents/request-details-components/RequestDetails.svelte";
	import RequestMessages from "./requestViewerComponents/messaging-components/RequestMessages.svelte";
	import { deleteObject, listAll, ref } from "firebase/storage";
    import { jsPDF } from "jspdf"
    import "jspdf-autotable";
    
    const dispatch = createEventDispatcher();

    export let dataToView;
    export let officialsList;
    let page = 0;

    async function updateHandler() {
        try {
            const docRef = doc(db, dataToView.collectionReference, dataToView.requestId);
            // const something = await getDoc(docRef)

            // if(dataToView.status === "Trashed"){

            //     await updateDoc(docRef, {
            //         status: dataToView?.previousStatus,
            //         previousStatus: "",
            //         lastUpdated: Timestamp.now()
            //     })
            // } else {

            //     if(dataToView.nextStatus === "Request Completed"){ 
            //         clearDocumentRequestFiles();
                     
            //     }
            //     await updateDoc(docRef, {
            //         status: dataToView.nextStatus,
            //         lastUpdated: Timestamp.now()
            //     })
            // }

            // const result = await sendEmail({
            //     to: dataToView.email,
            //     subject: dataToView.typeOfRequest + 'Status Update',
            //     html: '<p>' + dataToView.nextStatusEmailContent??[] + '<p>'
            // });

            // document.addImage("/brgyLogo.png", "PNG", 15, 40, 180, 180);
            // document.text(JSON.stringify(something.data().firstName), 50, 85,)


            // const pdf = new jsPDF();

            // get the current page size
            // const pageSize = document.internal.pageSize.;

            // extract the width and height from the page size object
            const officialsList = await getDocs(query(collection(db, "officialsList"), orderBy("positionOrder", "asc")))
            const document = new jsPDF("p", "px", "letter");
            // const fontList = document.getFontList();

            const pageWidth = document.internal.pageSize.width;
            const pageHeight = document.internal.pageSize.height;
            
            // document.rect(headerBoxX, headerBoxY, pageWidth, headerBoxHeight);
            document.setFont("times", "normal")
            document.setFontSize(8)
            document.text("REPUBLIC OF THE PHILIPPINES", pageWidth/2 ,10, { maxWidth: pageWidth, align: "center",})

            document.text("PROVINCE OF LAGUNA", pageWidth/2 ,18, { maxWidth: pageWidth, align: "center",})

            document.text("CITY OF SAN PEDRO", pageWidth/2 ,26, { maxWidth: pageWidth, align: "center",})

            document.text("BARANGAY UNITED BAYANIHAN", pageWidth/2 ,34, { maxWidth: pageWidth, align: "center",})

            document.setFont("helvetica", "bold")
            document.setFontSize(14)
            document.setTextColor("#16a34a")
            document.text("OFFICE OF THE BARANGAY CHAIRMAN", pageWidth/2 ,48, { maxWidth: pageWidth, align: "center",})

            document.setFont("times", "italic")
            document.setFontSize(8)
            document.setTextColor("")
            document.text("Tel No. (02) 961-43-44", pageWidth/2 ,58, { maxWidth: pageWidth, align: "center",})
            document.addImage("/brgyLogo.png", 15,5,60,60)
            
            document.setLineWidth(1.5)
            document.setDrawColor("#2563eb")
            document.line( 0, 70, pageWidth, 70)
            document.line(pageWidth * 0.28, 70, pageWidth * 0.28, pageHeight - 20)

            //copy mo nalang tong code cai, simula dito....

            //for the header 
            document.setFont("times", "bold")
            document.setFontSize(18)
            document.setTextColor("black")
            document.text("CERTIFICATE OF INDIGENCY", (pageWidth * 0.63), 90, { maxWidth: pageWidth, align: "center",})
            
            //for the letter

            let totalHeightOfLetter = 120;
            document.setFont("times", "bold")
            document.setFontSize(12)
            document.text("Name nung nag request or guardian", (pageWidth * 0.30), totalHeightOfLetter, {maxWidth: (pageWidth*0.9) })
            
            document.setFont("times", "normal")
            document.setFontSize(12)
            document.text("This is to certify that the person mentioned above belongs to the low income group and has no permanent source of income", (pageWidth * 0.30), totalHeightOfLetter+25, {maxWidth: pageWidth*0.68})
            
            document.text("This is issued as per request for (Purpose ng docu) for the person below", (pageWidth * 0.30), totalHeightOfLetter+60, {maxWidth: pageWidth*0.68})
            document.setFont("times", "bold")
            document.text("Name ng resident", (pageWidth * 0.30), totalHeightOfLetter+75, {maxWidth: pageWidth*0.68})

            //name of barangay captain
            document.text("HON. (name ni kap)", (pageWidth * 0.80), totalHeightOfLetter+125, {maxWidth: pageWidth*0.80, align:"center"})
            document.setLineWidth(1.5)
            document.setDrawColor("black")
            document.line(pageWidth * 0.70, totalHeightOfLetter+130, pageWidth * 0.90, totalHeightOfLetter+130)
            document.setTextColor("#b91c1c")
            document.text("Barangay Captain", (pageWidth * 0.80), totalHeightOfLetter+140, {maxWidth: pageWidth*0.80, align:"center"})
            //...hanggang dito


            document.setFont("helvetica", "bold")
            document.setFontSize(10)
            document.setTextColor("#b91c1c")
            document.text("Sanguniang Barangay", (pageWidth * 0.28)/2, 80, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })


            // console.log(document.getFontList())

            let totalOfficialsBoxHeight = 85;

            officialsList.docs.map((doc, index)=>{
                let rectHeight; 
                if(doc.data().departments === "") {rectHeight = 20} else {rectHeight = 47}
                // document.rect( (pageWidth * 0.28) * 0.05, 5 + totalOfficialsBoxHeight, (pageWidth * 0.28)*0.9, rectHeight)

                document.setFont("helvetica", "bold")
                document.setFontSize(8      )
                document.setTextColor("")
                document.text("HON. " + doc.data().name.toUpperCase(), (pageWidth * 0.28)/2, 10 + totalOfficialsBoxHeight,  {maxWidth: (pageWidth * 0.28) * 0.90, align: "center" })

                document.setFont("helvetica", "normal")
                document.setFontSize(8)
                document.setTextColor("#b91c1c")
                document.text((doc.data().posisyon == "" ? doc.data().position : doc.data().posisyon), (pageWidth * 0.28)/2, 18 + totalOfficialsBoxHeight, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })

                document.setFontSize(8)
                document.setTextColor("")
                document.text(doc.data().departments??"", (pageWidth * 0.28)/2, 26 + totalOfficialsBoxHeight, {maxWidth: (pageWidth * 0.28) * 0.80, align: "center" })

                totalOfficialsBoxHeight += 5 + rectHeight;
            })


            document.save("sample.pdf")


            // console.log(JSON.stringify(result))
            // alert("This request's status has been successfully updated, click OK to close")
            // dispatch("close")
        } catch (error) {
            console.log(error)
        }  
    }

    async function trashHandler() {
        try {
            const docRef = doc(db, dataToView.collectionReference, dataToView.requestId);

            await updateDoc(docRef, {
                previousStatus: dataToView.status,
                status: "Trashed",
            })
            // alert("Successfully moved to trash")
            dispatch("close")
        } catch (error) {
            alert(error)
        }
    }

    async function removeHandler(){
        try{
            let requestId = dataToView.requestId;

            const requestMessages = await getDocs(query(collection(db, "requestMessages"), where("trackingId", "==", "id-" + requestId)));
            requestMessages.forEach((message)=>{
                deleteDoc(doc(db, "requestMessages", message.id))
            })
            console.log("messages have been successfully deleted")

            listAll(ref(storage, "message_files/" + requestId))
            .then((files)=>{
                files.items.forEach((file) => {
                    const fileRef = ref(storage, file.fullPath)
                    deleteObject(fileRef)
                })
                console.log("message files have been successfully deleted")
            })

            if(dataToView.typeOfRequest === "Document Request"){
                clearDocumentRequestFiles()
            }
            await deleteDoc(doc(db, dataToView.collectionReference, dataToView.requestId))
            alert("Request removed successfully")
            dispatch("close")
        }catch(error){
            alert(error.message)
        }
    }

    function clearDocumentRequestFiles(){
        listAll(ref(storage, "documentRequestsFiles/" + dataToView.requestId))
        .then((requirements)=>{
            requirements.prefixes.forEach((requirement) => {
                listAll(ref(storage, requirement.fullPath)).then((files)=>{
                    files.items.forEach((file)=>{
                        const fileRef = ref(storage, file.fullPath)
                        deleteObject(fileRef)
                    })
                })
            })
            console.log("Files removed successfully");
        })
    }
</script>

<div class="w-full h-full flex flex-col items-center p-4">
    <div class="w-full flex justify-between items-center">
        <button class="btn btn-ghost hover:bg-inherit flex gap-[1px]" on:click={() => {dispatch("close")}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p class="hover:underline">Close</p>
        </button>
        <!-- {#if dataToView.}
            
        {/if} -->
        <div class="flex gap-2">
            {#if dataToView.status !== 'Trashed' && dataToView.nextStatus !== undefined}
            <button class="btn btn-success btn-sm text-sm hover:underline hover:scale-105 active:scale-100" on:click={updateHandler}>Update Status to: {dataToView.nextStatus}</button>
            <button class="btn btn-error btn-sm flex gap-2 hover:scale-105 active:scale-100" on:click={trashHandler}>
                <p>Move to Trash</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
            {:else if dataToView.status === 'Trashed' }
            <button class="btn btn-info btn-sm text-sm hover:underline hover:scale-105 active:scale-100" on:click={updateHandler}>Revert Status to: {dataToView?.previousStatus}</button>
            <button class="btn btn-error btn-sm flex gap-2 hover:scale-105 active:scale-100" on:click={removeHandler}>
                <p>Remove Request</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
            </button>
            {/if}
        </div>
    </div>
    <div class="p-4 w-full h-max min-h-[80vh] flex flex-col lg:flex-row items-start justify-start gap-10">
        <NavigationButtons {page} on:navigate={(event) => page = event.detail.index}/>
        <section class="w-full" class:hidden={page !== 0}>
            <RequestDetails {dataToView} on:viewImage={(event)=>console.log(event.detail.url)}/>
        </section>
        <section class="h-full w-full" class:hidden={page !== 1}>
            <RequestMessages 
                requestId = {dataToView.requestId} 
                requesterFullName={dataToView.lastName + ", " + dataToView.firstName + " " + dataToView.middleName}
                requestPath={dataToView.requestPath} requestorEmail = {dataToView.email} status={dataToView.status}
            />
        </section>
    </div>
</div>