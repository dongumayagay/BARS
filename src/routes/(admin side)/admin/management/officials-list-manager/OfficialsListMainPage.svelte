<script>
    import { onMount } from "svelte";
    import { collection, onSnapshot } from "firebase/firestore";
    import { db } from "$lib/firebase/client"
    import OfficialDetailsEditor from "./OfficialDetailsEditor.svelte";
    import Bookkeeper from "./positions/Bookkeeper.svelte";
	import BrgyCaptain from "./positions/BrgyCaptain.svelte";
	import Councilors from "./positions/Councilors.svelte";
	import Secretary from "./positions/Secretary.svelte";
	import SkChairperson from "./positions/SkChairperson.svelte";

    export let managementPage;

    let showEditor = false;

    let officials = [];
    let officialDetailToEdit = {};
    let isAdd;
    onMount(()=>{
        const unsub = onSnapshot(collection(db, "officialsList"), (querySnapshot)=>{
            officials = querySnapshot.docs.map((doc)=>({
                id: doc.id,
                name: doc.data().name,
                position: doc.data().position,
                positionOrder: doc.data().positionOrder,
                facebook: (doc.data().facebook === "" ? undefined : doc.data().facebook),
                email: (doc.data().email === "" ? undefined : doc.data().email),
                phone: (doc.data().phone === "" ? undefined : doc.data().phone),
                departments: (doc.data().departments === "" ? undefined : doc.data().departments),
            }))
        })
        return()=>{
            unsub()
        }
    })

    function addHandler(event){
        officialDetailToEdit = {
            position: event.detail.position,
            posisyon: event.detail.posisyon,
            positionOrder: event.detail.positionOrder,
        }
        isAdd = true
        showEditor = true;
    }

    function editHandler(event){
        officialDetailToEdit = {
            ...event.detail,
        }
        isAdd = false
        showEditor = true;
    }

    function closeHandler(){
        officialDetailToEdit = {};
        showEditor = false;
    }
     $: console.log(officialDetailToEdit)
</script>

<section class="w-full h-full grid grid-rows-3 justify-cetner relative" class:hidden={managementPage !== 2}>
    <div class="w-full h-fullflex">
        <BrgyCaptain captain={officials.find(item=> item.positionOrder === 1)} on:add={addHandler} on:edit={editHandler}/>
    </div>
    <div class="w-full h-max">
        <Councilors councilors={officials.filter((item)=> item.positionOrder === 2)} on:add={addHandler} on:edit={editHandler}/>
    </div>
    <div class="w-full h-full flex items-center justify-center gap-4">
        <SkChairperson skChairperson={officials.find((item)=> item.positionOrder === 3)} on:add={addHandler} on:edit={editHandler}/>   
        <Secretary secretary={officials.find((item)=> item.positionOrder === 4)} on:add={addHandler} on:edit={editHandler}/>
        <Bookkeeper bookkeeper={officials.find((item)=> item.positionOrder === 5)} on:add={addHandler} on:edit={editHandler}/>
    </div>
    {#if showEditor}
    <OfficialDetailsEditor  officialDetails={officialDetailToEdit} {isAdd} on:close={closeHandler}/>
    {/if}
</section>