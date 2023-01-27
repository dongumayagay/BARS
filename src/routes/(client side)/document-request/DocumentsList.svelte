<script>
    import {createEventDispatcher} from "svelte";
    import { collection, onSnapshot } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"

    const dispatch = createEventDispatcher();

    // export let requestPurpose;

    let documentsList = []
    // let recommendations;

    const fetchDocumentsList = onSnapshot(collection(db, "documentsList"), (querySnapshot) => {
        documentsList = [];
        querySnapshot.forEach((doc)=>{
            documentsList = [ ...documentsList, doc.data()]
        })
    })
        
    let listOfRequestedDocuments = []
    
    function submitHandler() {
        let totalFee = 0;

        listOfRequestedDocuments.forEach((element) => {
            totalFee += element.fee
        })
        console.log(totalFee)
        dispatch("next", {
            listOfRequestedDocuments, totalFee
        })
    }
</script>


<form class="w-full flex flex-col items-center justify-start gap-4" on:submit|preventDefault={submitHandler} on:reset={(event)=>event.target.reset()}>
    <div class="w-full ">
        <p class=" text-center  font-bold">Documents List</p>
    </div>
    <p class=" text-center">Kindly check the box of the documents you need to request</p>
    <!-- <div>
        <p>Recommendations:</p>
    </div> -->
    <div class="flex flex-col items-start w-[95%] gap-10">
        {#each documentsList as document}
            <div class="w-full flex flex-col gap-2">
                <div class="flex items-center justify-center gap-3 ">
                    <input type="checkbox" 
                        value={document}
                        name="documents"
                        class="checkbox checkbox-primary"
                        bind:group={listOfRequestedDocuments} 
                    />
                    <p class="w-full p-2 border-b-2 border-primary font-semibold">{document.name}</p>
                </div>
                <div class="flex flex-col items-start gap-2">
                    <small>Requirements:</small>
                    <div class=" pl-10">
                        {#each document.requirements as requirement}
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-circle text-[5px]"></i>
                            <p>{requirement}</p>
                        </div>
                        {/each}
                    </div>
                </div>
                <div class="mt-2">
                    <small>Document Fee: </small>
                    <small class="font-semibold">P{document.fee}</small>
                </div>
            </div>
        {/each}
    </div>
    <section class="w-full flex flex-col lg:flex-row gap-4 justify-around items-center ">
        <div class="flex justify-start gap-1">
            <button type="submit" class="btn btn-primary flex lg:gap-1" disabled={listOfRequestedDocuments.length === 0}>
                <p>Next</p> 
                <i class="fa-solid fa-arrow-right"></i>
            </button>
            <button type="reset" class="btn btn-ghost hover:bg-neutral hover:underline hover:underline-offset-2" disabled={listOfRequestedDocuments.length === 0}>Clear Form</button>
        </div>
        <button type="button" class="btn btn-neutral p-3 lg:p-4 flex items-center gap-2 hover:bg-neutral group hover:border-none" on:click={()=>dispatch("back")}>
            <i class="fa-solid fa-arrow-left"></i>
            <p class=" group-hover:underline group-hover:underline-offset-2">Go Back</p>
        </button>
    </section>
</form>