<script>
    /** @type {import('./$types').PageData} */
    export let data;

    const {documentRequest} = data;
    console.log(documentRequest);
</script>

<main class="p-4 w-full h-max flex items-center justify-center">
    <section class="w-[90vw] lg:w-[60vw] flex flex-col bg-neutral p-4 rounded-2xl shadow-xl gap-4">
        <div class="w-full flex justify-center items-center border-b-2 border-b-primary-focus border-dashed">
            <p class="w-max p-2 flex justify-center text-center rounded-xl font-semibold">ID: </p>
            <p class="font-semibold hover:underline">{documentRequest.id}</p>
        </div>
        <div class="flex flex-col gap-5">
            <div class="flex flex-col justify-between md:flex-row-reverse gap-3">
                <p class="text-[12px] w-full md:w-[25vw]">Date Requested: {documentRequest.dateAdded.toDate()}</p>
                <div class="flex flex-col">
                    <p class="font-semibold">{documentRequest.lastName}, {documentRequest.firstName} {documentRequest.middleName}</p>
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
                </div>
            </div>
            <div class="text-sm flex flex-col ">
                <p class="font-semibold">Documents Requested</p>
                <div>
                    {#each documentRequest.docsRequested as document}
                        <div class="ml-5 flex items-center gap-2">
                            <i class="fa-solid fa-circle text-[8px]"></i>
                            <p>{document.name}</p>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="flex gap-2">
                <small>Status:</small>
                <small class:text-info={documentRequest.status=="pending"}>{documentRequest.status}</small>

            </div>
        </div>
    </section>
</main>