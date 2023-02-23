<script>
    import { createEventDispatcher } from "svelte";
	import Admin from "./positions/Admin.svelte";
	import BrgyCaptain from "./positions/BrgyCaptain.svelte";
	import Councilors from "./positions/Councilors.svelte";
	import Secretary from "./positions/Secretary.svelte";

    const dispatch = createEventDispatcher();
</script>

<section class="w-full h-full flex flex-col">
    <div class="w-full min-h-1/2 flex">
        <BrgyCaptain />
        <Councilors />
    </div>
    <div class="w-full h-1/4">
        <Secretary />
    </div>
    <div class="w-full h-1/4">
        <Admin />
    </div>
</section>


