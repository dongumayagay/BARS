<script>
    import { createEventDispatcher } from "svelte";
    import { userStore } from "$lib/stores.js";

    export let isSaveAction;

    const dispatch = createEventDispatcher();

    let passwordInput;
    let showError = false;

    function passwordConfirmHandler(){
        console.log(passwordInput, $userStore)
        if(passwordInput === $userStore.password){
            showError = false;
            alert("passwordConfirmed")
        } else {
            showError = true;
        }
    }

    $: if(showError){
        setTimeout(()=>{
            showError = false;
        }, 3000)
    }
</script>

<section class="absolute top-0 left-0 w-full h-full bg-black/70 flex justify-center items-center z-20 rounded-xl p-4">
    <form class="w-full h-max flex flex-col items-center bg-neutral rounded-xl shadow-xl py-4 gap-3" on:submit|preventDefault={passwordConfirmHandler}>
        <div class="w-full flex items-center">
            <button class="btn btn-ghost hover:bg-transparent gap-2 group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                <p class="group-hover:underline">Go Back</p>
            </button>
        </div>
        <p class="font-semibold">Enter your password:</p>
        <div class="w-full flex flex-col justify-center items-center">
            <input type="password" id="password" class="w-full input input-ghost text-center focus:bg-transparent focus:outline-none" placeholder="Type here" bind:value={passwordInput}>
            <small class="text-error" class:hidden={!showError}>Incorrect Password</small>
        </div>
        <button type="submit" class="btn btn-success">Confirm</button>
    </form>
</section>