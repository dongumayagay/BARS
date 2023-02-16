<script>
    import { db } from "$lib/firebase/client.js"
	import { collection, onSnapshot } from "firebase/firestore";
	import DocumentCard from "./DocumentCard.svelte";
    import { createEventDispatcher } from "svelte";
    
    // export let page;

    const dispatch = createEventDispatcher();

    let documentsList = [];

    const documentsListListener = onSnapshot(collection(db, "documentsList"), (querySnapshot)=>{
        documentsList = [];
        querySnapshot.forEach((doc)=>{
            documentsList = [...documentsList, {
                ...doc.data(),
                id: doc.id
            }]
        })
    }) 
</script>

<section class="w-full h-full flex flex-col gap-4 p-4">
    <div class="w-full flex justify-start">
        <button class="btn btn-primary flex items-center gap-2" on:click={()=>dispatch("add")}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zM12.75 12a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V18a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V12z" clip-rule="evenodd" />
                <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
            </svg>
            <p>Add Document</p>
        </button>
    </div>
    <div class="w-full h-full flex flex-wrap justify-center items-center gap-4">
        {#each documentsList as document }
            <DocumentCard {document} on:open={(event)=>dispatch("open", {
                        document: event.detail.document
                    }
                )
            }/>
        {/each}
    </div>
</section>