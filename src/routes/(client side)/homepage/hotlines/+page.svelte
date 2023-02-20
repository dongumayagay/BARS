<script>
	import { collection, getDocs, query } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
	import HotlineCard from "./HotlineCard.svelte";

    async function emergencyHotlinesFetcher() {
        let hotlinesList = [];
        const emergencyHotlinesCollection = await getDocs(collection(db, "hotlinesList"));
        emergencyHotlinesCollection.forEach((doc)=>{
            hotlinesList = [...hotlinesList, {
                ...doc.data()
            }]
            console.log(doc.data())
        })
        return hotlinesList;
    }
</script>

<svelte:head>
    <title>Homepage - Emargency Hotlines | B.A.R.S.</title>
</svelte:head>


<section class="w-full min-h-screen lg:w-[70%] flex flex-col items-end justify-start gap-6 px-6 pb-6">
    {#await emergencyHotlinesFetcher()}
        <p>Loading...</p>
    {:then hotlinesList} 
        {#each hotlinesList as hotline}
            <HotlineCard {hotline}/>
        {/each}
    {/await}
</section>



