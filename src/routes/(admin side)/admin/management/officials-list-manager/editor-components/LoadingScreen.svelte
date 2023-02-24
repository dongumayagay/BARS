<script>
	import { Circle } from "svelte-loading-spinners";

    export let name;

</script>
<section class="absolute top-0 left-0 w-full h-full bg-black/70 flex flex-col justify-center items-center z-20 rounded-xl">
    <div class="w-full flex justify-center">
        <Circle color={"#fff"} />
    </div>
    <p class="w-full font-bold text-center text-white">Saving {name}'s details. <br>Please wait...</p>
</section>