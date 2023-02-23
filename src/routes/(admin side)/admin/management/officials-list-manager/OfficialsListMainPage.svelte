<script>
    import OfficialsListManagerMenu from "./OfficialsListManagerMenu.svelte";
    import OfficialDetailsEditor from "./OfficialDetailsEditor.svelte";

    export let managementPage;

    let showEditor = false;
    let showLoadingScreen = false;
    let documentDetails;

    function openHandler(){

    }

    function closeHandler(){

    }

    function submitHandler(){

    }

    function deleteHandler(){

    }

</script>

<section class="w-full h-full relative" class:hidden={managementPage !== 2}>
    <OfficialsListManagerMenu on:open={openHandler} on:add={()=>showEditor = true}/>
    {#if showEditor}
    <OfficialDetailsEditor {documentDetails} {showLoadingScreen}
        on:close={closeHandler} 
        on:submit={(event)=>submitHandler(event)}
        on:delete={(event)=>deleteHandler(event)}
    />
    {/if}
</section>