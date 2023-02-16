<script>
    import { createEventDispatcher } from "svelte";
    export let document;

    const dispatch = createEventDispatcher();

    function dispatchHandler(){
        dispatch("open", {
            document
        })
    }
</script>

<button class="w-[23%] h-[200px] relative flex justify-center group hover:scale-110 transition-all duration-150" on:click={dispatchHandler}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-full h-full text-neutral">
      <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
      <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
    </svg>
    <div class="absolute top-[37%] h-1/2 w-[55%] flex  justify-center items-center">
        <p class="text-center font-sans font-semibold group-hover:underline group-hover:underline-offset-2">{document.name}</p>
    </div>
</button>

