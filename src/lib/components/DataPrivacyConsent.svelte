<script>
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();
</script>

<section class="fixed top-0 left-0 w-screen h-screen bg-black/70 flex justify-center items-center z-20">
    
    <div class="w-[80vw] h-[90vh] lg:w-[45%] lg:h-[60vh] bg-neutral flex flex-col gap-2 p-4 rounded-xl shadow-lg">
        <div class="w-full flex justify-between">
            <p class="font-semibold">Data Privacy Consent</p>
            <button class="w-max h-max" on:click={()=>dispatch("close")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
        <div class="overflow-y-auto h-[90%] flex flex-col gap-4 items-center border-2 border-primary p-4 rounded-md 
        shadow-inner">
            <div class="w-full flex flex-col items-center gap-2">
                <p class="w-full text-center">I understand that by using the system, my personal information, including the files I upload, will be collected, stored, and used in accordance with the privacy policy and the 
                    <a href="https://www.privacy.gov.ph/data-privacy-act/" class="text-info underline underline-offset-2">Data Privacy Act of 2012 of the Philippines</a>.
                </p>
                <p class="w-full text-center">I acknowledge that my personal information and files will be used solely for the purpose of processing my requested document, verifying my identity, and tailoring the services offered by the system to better meet my needs.</p>
                <p class="w-full text-center">Appropriate security measures will be taken to protect my information, and it will not be shared or sold to any third parties, except as required by law and as permitted under the Data Privacy Act of 2012.</p>
            </div>
            <div>
                <button class="btn btn-success" on:click={()=>dispatch("agree")}>Agree</button>
                <button class="btn btn-ghost" on:click={()=>dispatch("decline")}>Decline</button>
            </div>

        </div>
    </div>
</section>