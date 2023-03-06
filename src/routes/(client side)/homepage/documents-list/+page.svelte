<script>
    import { collection, onSnapshot } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
	import DocumentInfoCard from "./DocumentInfoCard.svelte";


    let documentsList = []

    const fetchDocumentsList = onSnapshot(collection(db, "documentsList"), (querySnapshot) => {
        documentsList = []
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            documentsList = [...documentsList, {
                ...doc.data()
            }]
        })
    })
</script>

<svelte:head>
    <title>Homepage - Documents List | B.A.R.S.</title>
</svelte:head>

<main class="lg:overflow-y-auto lg:max-h-[70vh] w-full lg:w-[70%] flex flex-col lg:flex-auto gap-10 items-center">
    <p class="w-full text-center text-lg font-bold">Documents List</p>
    {#each documentsList as document}
        <DocumentInfoCard {document}/>
    {/each}
</main>

