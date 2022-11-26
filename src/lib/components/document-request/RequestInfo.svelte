<script>



export let requestData;
export let doclistReq;

$: console.log(requestData, doclistReq)
</script>


<section>
    <p class="w-full text-center font-bold lg:text-lg mb-2">Here's what we got from you:</p>
    <div class="overflow-y-auto max-h-[500px] lg:max-h-max flex flex-col lg:flex-row">
        <!-- Basic Information section -->
        <div class="p-4 border-b-2 lg:border-b-0 lg:border-r-2 border-primary">
            <div class="flex flex-col items-center justify-start gap-4">
                <div class="w-full flex flex-col items-start justify-start">
                    <p class="w-full font-semibold lg:text-md">Full Name: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{requestData.lastName}, {requestData.firstName} {requestData.middleName}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <p class="w-full font-semibold lg:text-md">Birthdate: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{requestData.birthdate}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <p class="w-full font-semibold lg:text-md">Age: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{requestData.age} {requestData.age >= 2 ? " years old" : "year old"}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <p class="w-full font-semibold lg:text-md">Complete Address: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{requestData.address}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <p class="w-full font-semibold lg:text-md">Email Address: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{requestData.email}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <p class="w-full font-semibold lg:text-md">Phone Number: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{requestData.contact}</p>
                </div>
                <div class="w-full flex flex-col items-start justify-start">
                    <p class="w-full font-semibold lg:text-md">Purpose of the request: </p>
                    <p class="w-full text-center underline underline-offset-[10px] lg:text-md">{requestData.purpose}</p>
                </div>
            </div>
        </div>
        
        <!-- Documents Requested section -->
        <div class="p-4">
            <p class="w-full text-center font-semibold">Documents you requested: </p>
            {#each doclistReq as document}
                <p>{document.name}</p>
            {/each}
        </div>

    </div>
</section>