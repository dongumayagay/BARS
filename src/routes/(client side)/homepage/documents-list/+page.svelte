<script>
	import DocumentInfoCard from "./DocumentInfoCard.svelte";


const documentsList = [
        {
            id: "1",
            name: "Document 1",
            requirements: [
                {name: "requirement1"},
                {name: "requirement2"},
            ]
        },
        {
            id: "2",
            name: "Document 2",
            requirements: [
                {name: "requirement1"},
                {name: "requirement2"},
                {name: "requirement3"}
            ]
        },
        {
            id: "3",
            name: "Document 3",
            requirements: [
                {name: "requirement1"}
            ]
        },
        {
            id: "4",
            name: "Document 4",
            requirements: [
                {name: "requirement1"},
                {name: "requirement2"},
                {name: "requirement3"}
            ]
        },
    ]
</script>

<svelte:head>
    <title>Homepage - Documents List | B.A.R.S.</title>
</svelte:head>

<main class="lg:overflow-y-auto lg:max-h-[70vh] w-full lg:w-[70%] flex flex-col lg:flex-auto gap-6 items-center">
    {#each documentsList as document}
        <DocumentInfoCard {document}/>
    {/each}
</main>

