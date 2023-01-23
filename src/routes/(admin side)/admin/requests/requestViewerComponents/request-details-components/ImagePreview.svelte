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
    <div class="w-[150px] h-[150px] flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[50px] h-[50px] opacity-70">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
        </svg>
    </div>
{:then url} 
    <img src={url} alt={requirementName} class="w-[150px] h-[150px]">
{:catch error}
    <p>{error}</p>
{/await}