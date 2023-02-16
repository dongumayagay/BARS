<script>
	import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
	import DocumentEditor from "./DocumentEditor.svelte";
import DocumentListManagerMenu from "./DocumentListManagerMenu.svelte";

    export let managementPage;

    let showEditor = false;
    let showLoadingScreen = false;
    let documentDetails;

    function openHandler(event){
        event.detail.document
        documentDetails = event.detail.document;
        showEditor = true;
    }

    function closeHandler(){
        documentDetails = "";
        showEditor = false;
    }

    async function deleteHandler(event){
        try {
            showLoadingScreen = true;
            const deleteDocumentRef = await deleteDoc(doc(db, "documentsList", event.detail.id))
            alert("Documents list has been successfully updated");
            documentDetails = "";
            showLoadingScreen = false;
            showEditor = false;
        } catch (error) {
            alert(error.message);
        }
    }

    async function submitHandler(event){
        try{
            let documentUpdateRef;
            showLoadingScreen = true;
            if(event.detail.isUpdating === true){
                documentUpdateRef = await updateDoc(doc(db, "documentsList", event.detail.editableDocumentDetails.id), {
                    name: event.detail.editableDocumentDetails.name,
                    requirements: event.detail.editableDocumentDetails.requirements,
                    fee: event.detail.editableDocumentDetails.fee
                })
            } else {
                documentUpdateRef = await addDoc(collection(db, "documentsList"), {
                    name: event.detail.editableDocumentDetails.name,
                    requirements: event.detail.editableDocumentDetails.requirements,
                    fee: event.detail.editableDocumentDetails.fee
                })
            }
                alert("Documents list has been successfully updated")
                documentDetails = "";
                showLoadingScreen = false;
                showEditor = false;
        }catch(error){
            alert(error.message)
        }
    }
</script>

<section class="w-full h-full relative" class:hidden={managementPage !== 1}>
    <DocumentListManagerMenu on:open={openHandler} on:add={()=>showEditor = true}/>
    {#if showEditor}
    <DocumentEditor {documentDetails} {showLoadingScreen}
        on:close={closeHandler} 
        on:submit={(event)=>submitHandler(event)}
        on:delete={(event)=>deleteHandler(event)}
    />
    {/if}
</section>