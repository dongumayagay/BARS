<script>

    export let officialProfile;

    let showContacts = false;
</script>

<section class="w-[80%] flex flex-col gap-2">
    <section class="w-full bg-neutral flex flex-col rounded-xl z-10">
        <div class="w-full h-[100px] border-b-[1px] border-primary p-4">
            <p class="font-semibold">{officialProfile.name}</p>
            <p class="text-sm ">{officialProfile.position}</p>
        </div>
        <label class="w-full px-4 flex justify-between items-center">
            <p>Contact Details</p>
            <div class="bottom-[25px] btn btn-primary btn-circle p-2 swap swap-rotate">
                <input type="checkbox" class="invisible" bind:checked={showContacts} />
    
                <!-- arrow down -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 swap-off">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
    
                <!-- arrow up -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 swap-on">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
            </div>
        </label>
    </section>
    
    <section class="w-full flex flex-col gap-2 rounded-xl z-1 mb-10 {showContacts ? " " : "opacity-0 h-0  translate-y-[-6rem]"} transition-all ease-in-out duration-300 z-1">
        {#if officialProfile.email != ""}
            <a href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcRzDsPgrvpFkBRKMWflTMCNScvkfdBcVRGnFhFhcLLXjFcCZBLRrFGWTRknCzDCXwdQPWwxH/${officialProfile.email}" class="bg-neutral flex items-center gap-4 rounded-xl p-4">
                <!-- <i class="fa-solid fa-envelope text-red-600 text-[45px]"></i> -->
                <i class="fa-regular fa-envelope text-red-600 text-[45px]"></i>
                <div class="flex flex-col">
                    <p class="font-semibold text-red-600 text-lg">Email</p>
                    <p class="text-sm">{officialProfile.email}</p>
                </div>
            </a>
        {/if}
        {#if officialProfile.facebook != ""}
            <a href={officialProfile.facebook.link} class="bg-neutral flex items-center gap-4 rounded-xl p-4">
                <i class="fa-brands fa-facebook text-[45px] text-blue-900"></i>
                <div class="flex flex-col">
                    <p class="font-semibold text-blue-900 text-lg">Facebook</p>
                    <p class="text-sm">{officialProfile.facebook.profileName}</p>
                </div>
            </a>
        {/if}
    </section>

</section>

