<script>
    import RequestBasicInfo from "./RequestBasicInfo.svelte";
	import DocumentsRequested from "./DocumentsRequested.svelte";
	import SelectedDateAndOfficial from "./SelectedDateAndOfficial.svelte";

    export let dataToView;
</script>

<section class="w-[90vw] lg:w-[60vw] flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4">
    <div class="w-full flex justify-center items-center border-b-2 border-b-primary-focus border-dashed">
        <p class="w-max p-2 flex justify-center text-center rounded-xl font-semibold">ID: </p>
        <p class="font-semibold hover:underline">{dataToView.requestId}</p>
    </div>
    <div class="flex flex-col gap-5">
        <RequestBasicInfo {dataToView}/>
        <div class="text-sm flex flex-col ">
            {#if dataToView.typeOfRequest === "Document Request"}
                <DocumentsRequested {dataToView} />
            {:else}
                <SelectedDateAndOfficial appointmentDetails={{
                    appointmentDate: dataToView.appointmentDate??[],
                    appointmentTime: dataToView.appointmentTime??[],
                    selectedOfficial: dataToView.selectedOfficial??[]
                }} />
            {/if}
            
        </div>
        <div class="flex gap-2">
            <small>Status:</small>
            <small 
                class="font-semibold"
                class:text-info={dataToView.status === "pending"}
                class:text-success={dataToView.status === "Ready to claim" || dataToView.status === "Approved"}
                class:text-error={dataToView.status === "Trashed"}
            >{dataToView.status}</small>
        </div>
    </div>
</section>