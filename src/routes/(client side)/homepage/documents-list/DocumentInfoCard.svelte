<script>
    export let document;

    let showList = false;
</script>

<section class="w-[80%] flex flex-col gap-2">
    <section class="w-full bg-neutral flex flex-col rounded-xl shadow-lg z-10">
        <div class="w-full h-[85px] flex flex-col justify-between border-b-[1px] border-primary p-4">
            <p class="font-semibold">{document.name}</p>
            <small>Document Fee: P{document.fee}</small>
        </div>
        <label class="w-full px-4 flex justify-between items-center">
            <p>Requirements</p>
            <div class="bottom-[25px] btn btn-primary btn-circle p-2 swap swap-rotate">
                <input type="checkbox" class="invisible" bind:checked={showList} />
    
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
    
    <section class="w-full flex flex-col gap-2 rounded-xl z-1 mb-10 {showList ? " " : "opacity-0 h-0  translate-y-[-6rem]"} transition-all ease-in-out duration-300 z-1">
        {#each document.requirements as requirement}
            <div class="bg-neutral flex items-center gap-4 rounded-xl shadow-lg p-4">
                <i class="fa-solid fa-id-card"></i>
                <div class="flex items-center gap-2">
                    <p>{requirement.name}</p>
                    <small class="text-info" class:hidden={!requirement.isRequired}>(Required)</small>
                </div>
            </div>
        {/each}
    </section>

</section>