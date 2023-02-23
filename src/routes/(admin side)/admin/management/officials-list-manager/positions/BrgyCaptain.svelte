<script>
	import { doc, getDoc } from "firebase/firestore";
    import { db } from "$lib/firebase/client"
	import { onMount } from "svelte";

    let captain = {};
    onMount(()=>{
        getCaptainHandler()
    })


    async function getCaptainHandler(){
        captain = {};
        const captainDetails = await getDoc(doc(db, "officialsList", "Barangay Captain"))
        console.log(captainDetails)
        if(captainDetails.exists()){
            console.log(captainDetails.data())
            captain = {...captainDetails.data(), position: captainDetails.id};
        } 
    }

    $: console.log(captain)
</script>

<section class="w-full h-full flex items-center justify-center">
    {#if captain !== {}}
     <p>{captain.name}</p>
    {:else}
    <button>
        Add an Official 
    </button>
    {/if}
</section>