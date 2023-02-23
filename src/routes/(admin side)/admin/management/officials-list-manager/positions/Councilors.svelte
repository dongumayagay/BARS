<script>
    import { collection, getDocs, query, where } from "firebase/firestore";
    import { db } from "$lib/firebase/client"
	import { onMount } from "svelte";

    let councilors = [];

    onMount(()=>{
        getCouncilorsHandler()
    })

    async function getCouncilorsHandler(){
        const councilorsSnapshot = await getDocs(query(collection(db, "officialsList"), where("positionOrder", "==", "2")))
        councilors = councilorsSnapshot.docs.map((doc)=>({...doc.data(), position: doc.id}))
    }
</script>

