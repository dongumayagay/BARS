<script>
	import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js";
    import Official from "./Official.svelte";

    async function officialsListFetcher(){
        let officialsList = [];
        const officialsListCollection = await getDocs(query(collection(db, "officialsList"), orderBy("positionOrder")));
        officialsListCollection.forEach((doc)=>{
            officialsList = [...officialsList, {
                ...doc.data()
            }]
        })

        return officialsList;
    }

</script>

<svelte:head>
    <title>Homepage - Barangay Officials | B.A.R.S.</title>
</svelte:head>

<section class="lg:overflow-y-auto lg:max-h-[70vh] w-full lg:w-[70%] flex flex-col lg:flex-auto gap-6 items-center">
    {#await officialsListFetcher()}
        <p>Loading</p>
    {:then officialsList} 
        {#each officialsList as official}
            <Official officialProfile={official}/>
        {/each}
    {/await}
</section>