<script>
    import { storage } from "$lib/firebase/client.js"
    import { ref, getDownloadURL } from "firebase/storage";

    export let requestId;
    export let documentName;
    export let requirementName;

    async function fetchURLHandler(){
        try {
            const pathName = "documentRequestsFiles/" + requestId + "/" + documentName + "/" + requirementName + ".jpg"; 
            const fileRef = ref(storage, pathName);

            const url = await getDownloadURL(fileRef)
            return url;
        } catch (error) {
            console.log(error.message)
        }
    }
</script>

{#await fetchURLHandler()}
    <div class="w-[150px] h-[150px] flex flex-col items-center justify-center">
        <img src="/loading.png" alt="loader" class="h-[20%]">
        <small>Loading image..</small>
    </div>
{:then url} 
    <div class="flex flex-col items-center gap-2">
        <img src={url} alt={requirementName} class="w-fit max-h-[150px]">
        <p>{requirementName}</p>
    </div>
{:catch error}
    <p>{error}</p>
{/await}