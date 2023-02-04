<script>

    export let officialProfile;

    let showContacts = false;

    let emailTooltip = "Copy to clipboard";
    let facebookTooltip = "Visit profile"

    function copyToClipboard(email) {
        navigator.clipboard.writeText(email);
        emailTooltip = "Copied";
        setTimeout( () => {
            emailTooltip = "Copy to clipboard";
        }, 2000)
    }

</script>

<section class="w-[80%] flex flex-col gap-2">
    <section class="w-full bg-neutral flex flex-col rounded-xl shadow-lg z-0">
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
    
    <section class="w-full flex flex-col gap-2 rounded-xl z-1 mb-10 {showContacts ? " " : "opacity-0 h-0  translate-y-[-7rem]"} transition-all ease-in-out duration-300 z-1" >
        {#if !!officialProfile.email}
            <button class="bg-neutral flex flex-col items-center gap-4 rounded-xl p-4 lg:tooltip lg:tooltip-accent group z-10" data-tip={emailTooltip} class:hidden={!showContacts} on:click={copyToClipboard(officialProfile.email)}>
                <!-- <i class="fa-solid fa-envelope text-red-600 text-[45px]"></i> -->
                <i class="fa-regular fa-envelope text-red-600 text-[45px]"></i>
                <div class="flex flex-col" >
                    <p class="font-semibold text-red-600 text-lg">{officialProfile.email}</p>
                    <!-- <p class="text-sm group-hover:underline">{officialProfile.email}</p> -->
                    <div class="w-full flex justify-center gap-2 lg:hidden">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg> -->
                        <p class="font-light text-sm">{emailTooltip}</p>
                    </div>
                </div>
            </button>
        {/if}
        {#if !!officialProfile.facebook}
            <a href={officialProfile.facebook.link} class="bg-neutral flex flex-col items-center gap-4 rounded-lg shadow-lg p-4 lg:tooltip lg:tooltip-accent group z-10" data-tip={facebookTooltip} class:hidden={!showContacts}>
                <i class="fa-brands fa-facebook text-[45px] text-blue-900"></i>
                <div class="flex flex-col">
                    <p class="font-semibold text-blue-900 text-lg">{officialProfile.facebook.profileName}</p>
                    <!-- <p class="text-sm">{officialProfile.facebook.profileName}</p> -->
                    <div class="w-full flex justify-center gap-2 lg:hidden">
                        <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg> -->
                        <p class="font-light text-sm">{facebookTooltip}</p>
                    </div>
                </div>
            </a>
        {/if}
    </section>

</section>

