<script>
    import { doc, getDoc } from "firebase/firestore";
    import { db } from "$lib/firebase/client"
	import { onMount } from "svelte";

    let bookkeeper = {};
    onMount(()=>{
        getBookkeeperHandler()
    })


    async function getBookkeeperHandler(){
        bookkeeper = {};
        const bookkeeperDetails = await getDoc(doc(db, "officialsList", "Bookkeeper"))
        console.log(bookkeeperDetails)
        if(bookkeeperDetails.exists()){
            console.log(bookkeeperDetails.data())
            bookkeeper = {...bookkeeperDetails.data(), position: bookkeeperDetails.id};
        } 
    }
</script>