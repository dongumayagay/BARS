<script>
	import { collection, getDocs, query } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
    import { Circle } from "svelte-loading-spinners";
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
    <div class="w-full h-[70vh] flex flex-col items-center justify-center">
        <Circle />
        <p class="">Loading Hotlines...</p>
    </div>
    {:then hotlinesList} 
    <p class="w-full text-center text-lg font-bold">Emergency Hotlines</p>
        {#each hotlinesList as hotline}
            <HotlineCard {hotline}/>
        {/each}
    {/await}
</section>



