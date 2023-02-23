<script>
    import { doc, getDoc } from "firebase/firestore";
    import { db } from "$lib/firebase/client"
	import { onMount } from "svelte";

    let secretary = {};
    onMount(()=>{
        getSecretaryHandler()
    })


    async function getSecretaryHandler(){
        secretary = {};
        const secretaryDetails = await getDoc(doc(db, "officialsList", "Secretary"))
        console.log(secretaryDetails)
        if(secretaryDetails.exists()){
            console.log(secretaryDetails.data())
            secretary = {...secretaryDetails.data(), position: secretaryDetails.id};
        } 
    }
</script>