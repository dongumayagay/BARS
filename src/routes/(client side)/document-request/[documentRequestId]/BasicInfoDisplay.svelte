<script>
    import {months} from "$lib/stores.js"

    export let documentRequest;

    let birth = new Date(documentRequest.birthDate);
    let birthDateFormat  = months[birth.getMonth()] + " " + birth.getDate() + ", " + birth.getFullYear()
</script>

{#if !!documentRequest.authorizedRequestor}
<div class="flex justify-start items-center gap-2">
    <p class="text-[12px]">Authorized Requestor: </p>
    <p class="text-[15px] font-semibold">{documentRequest.authorizedRequestor}</p>
</div>
{/if}
{#if !!documentRequest.guardianInfo}
    {#if documentRequest.guardianInfo.guardianship === "parents"}
    <div class="flex justify-start items-center gap-2">
        <p class="text-[12px]">Mother: </p>
        <p class="text-[15px] font-semibold">{documentRequest.guardianInfo.mother}</p>
    </div>
    <div class="flex justify-start items-center gap-2">
        <p class="text-[12px]">Father: </p>
        <p class="text-[15px] font-semibold">{documentRequest.guardianInfo.father}</p>
    </div>
    {/if}
    {#if documentRequest.guardianInfo.guardianship === "singleParent"}
    <div class="flex justify-start items-center gap-2">
        <p class="text-[12px]">{documentRequest.guardianInfo.parentsRelation === "mother" ? "Mother" : "Father"}: </p>
        <p class="text-[15px] font-semibold">{documentRequest.guardianInfo.parentsRelation === "mother" ? documentRequest.guardianInfo.mother : documentRequest.guardianInfo.father}</p>
    </div>
    {/if}
    {#if documentRequest.guardianInfo.guardianship === "guardian"}
    <div class="flex justify-start items-center gap-2">
        <p class="text-[12px]">Guardian: </p>
        <p class="text-[15px] font-semibold">{documentRequest.guardianInfo.guardian}</p>
    </div>
    {/if}
{/if}
<div class="flex flex-col justify-between md:flex-row-reverse gap-3">
    <p class="text-[12px] w-full md:w-[25vw]">Date Requested: {documentRequest.dateAdded.toDate()}</p>
    <div class="flex flex-col">
        <p class="font-semibold">{documentRequest.lastName}, {documentRequest.firstName} {documentRequest.middleName !== "" ? documentRequest.middleName.charAt(0).toUpperCase() + "." : ""} {documentRequest.suffix !== "" ? documentRequest.suffix.charAt(0).toUpperCase(): ""}</p>
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <small class="hover:underline hover:underline-offset-2">{documentRequest.email}</small>
        </div>
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <small class="hover:underline hover:underline-offset-2">{documentRequest.contactNo}</small>
        </div>
        <div class="h-fit flex items-center gap-2 mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              
            <small class="hover:underline hover:underline-offset-2">{documentRequest.completeAddress}</small>
        </div>
        <div class="h-fit flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
              </svg>
              
            <small class="hover:underline hover:underline-offset-2">{birthDateFormat}</small>
        </div>
    </div>
</div>