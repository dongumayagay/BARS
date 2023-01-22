<script>

    export let hotline;

    let tooltip = "Copy to clipboard";

    function copyToClipboard(number) {
        navigator.clipboard.writeText(number);
        tooltip = "Copied";
        setTimeout( () => {
            tooltip = "Copy to clipboard";
        }, 2000)
    }

</script>

<div class="w-full flex items-center justify-center gap-4">
    <div class="hidden lg:block w-max p-3">
        <i class={hotline.iconClassName}></i>
    </div>
    <div class="w-full h-max flex flex-col lg:flex-row justify-between bg-neutral p-4 rounded-xl shadow-xl">
        <div class="w-full border-b-2 lg:border-b-0 lg:border-r-2 border-primary pb-4 lg:pb-0">
            <p>{hotline.name}</p>
        </div>
        <button class="w-full lg:w-[30%] flex justify-start items-center pl-3 pt-3 lg:pt-0 gap-2 lg:tooltip lg:tooltip-primary group" data-tip={tooltip} on:click={copyToClipboard(hotline.number)}>
            <div class=" flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <p class="group-hover:underline ">{hotline.number}</p>
            </div>
            <div class=" flex items-center gap-2 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                </svg>
                <p class="font-light text-sm">{tooltip}</p>
            </div>
        </button>
    </div>
</div>