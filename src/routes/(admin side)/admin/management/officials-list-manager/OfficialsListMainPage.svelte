<script>
    import { onMount } from "svelte";
    import { collection, onSnapshot } from "firebase/firestore";
    import { db } from "$lib/firebase/client"
    import OfficialDetailsEditor from "./OfficialDetailsEditor.svelte";
    import Admin from "./positions/Admin.svelte";
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
            officials = querySnapshot.docs.map((doc)=>({...doc.data(), id: doc.id}))
        })
        console.log(officials)
        return()=>{
            unsub()
        }
    })

    function addHandler(event){
        officialDetailToEdit = {
            position: event.detail.position,
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

</script>

<section class="w-full h-full grid grid-rows-3 justify-cetner relative" class:hidden={managementPage !== 2}>
    <div class="w-full h-fullflex">
        <BrgyCaptain captain={officials.find(item=> item.position === "Barangay Captain")} on:add={addHandler} on:edit={editHandler}/>
    </div>
    <div class="w-full h-max">
        <Councilors councilors={officials.filter((item)=> item.position === "Barangay Councilor")} on:add={addHandler} on:edit={editHandler}/>
    </div>
    <div class="w-full h-full flex items-center justify-center gap-4">
        <Secretary secretary={officials.find((item)=> item.position === "Barangay Secretary")} on:add={addHandler} on:edit={editHandler}/>
        <SkChairperson skChairperson={officials.find((item)=> item.position === "SK Chairperson")} on:add={addHandler} on:edit={editHandler}/>   
        <Admin bookkeeper={officials.find((item)=> item.position === "Bookkeeper")} on:add={addHandler} on:edit={editHandler}/>
    </div>
    {#if showEditor}
    <OfficialDetailsEditor  officialDetails={officialDetailToEdit} {isAdd} on:close={closeHandler}/>
    {/if}
</section>