<script>
    import { createEventDispatcher } from "svelte";
    // import { auth } from "$lib/firebase/client.js"
    import { EmailAuthProvider } from "firebase/auth";
    import { userStore } from "$lib/stores.js"
	import { Circle } from "svelte-loading-spinners";
    // import { firebase } from "firebase/"
    // import { EmailAuthProvider } from "firebase/auth";

    export let email, username;
    export let showLoadingScreen;
    export let loadingStatement;
    
    let confirmPassword;
    let showPasswordModal = false;
    const dispatch = createEventDispatcher();
    

    async function submitHandler(){
        const credential = EmailAuthProvider.credential($userStore.email, confirmPassword);
        dispatch("update", {
            credential, email, username
        })
    }


</script>

<main class="fixed top-0 left-0 w-screen h-screen  bg-gradient-to-b from-base-200 to-base-100 flex flex-col items-center justify-center z-20">
    <form class="w-[80%] lg:w-1/2 h-max flex flex-col gap-4 bg-neutral p-4 z-20 rounded-xl shadow-xl" on:submit|preventDefault={()=>showPasswordModal=true}>
        <div class="w-full h-[15%] lg:h-max border-b-[1px] border-base-300 flex justify-center items-center relative">
            <p class="w-full h-max font-semibold py-6 lg:py-2 text-center">Edit Account Credentials</p>
            <button type="button" class="hidden absolute left-0 lg:flex gap-1" on:click={()=>dispatch("close")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <p class="text-[1rem]">Close</p>
            </button>
            <button type="button" class="lg:hidden absolute left-0 flex gap-1" on:click={()=>dispatch("close")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
        </div>
        <div class="w-full flex flex-col items-center justify-center gap-2">
            <label for="#username" class="font-semibold">Username</label>
            <input required type="text" id="username" placeholder="Type Here" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center" bind:value={username}>
        </div>
        <div class="w-full flex flex-col items-center justify-center gap-2">
            <label for="#email" class="font-semibold">Email Address</label>
            <input required type="text" id="email" placeholder="Type Here" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center" bind:value={email}>
        </div>
        <div class="w-full flex justify-end">
            <button type="submit" class="btn btn-success gap-2">
                <i class="fa-solid fa-floppy-disk text-xl"></i>
                <p>Save</p>
            </button>
        </div>
    </form>
    {#if showPasswordModal}
        <section class="fixed w-screen h-screen bg-black/70 flex justify-center items-center z-20">
            <form class="w-[80%] lg:w-1/2 flex bg-neutral flex-col items-center gap-4 rounded-xl p-4 relative" on:submit|preventDefault={submitHandler}>
                <div class="w-full flex ">
                    <button type="button" class="btn btn-ghost hover:bg-transparent" on:click={()=>showPasswordModal=false}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p>Close</p>
                    </button>
                </div>
                <div class="w-full flex flex-col items-center gap-2">
                    <p class="font-semibold">Enter current password</p>
                    <input required type="password" placeholder="Type Here" class="w-full input input-ghost bg-transparent text-center" bind:value={confirmPassword}>
                </div>
                <div class="w-full flex justify-end">
                    <button type="submit" class="btn btn-success">Confirm</button>
                </div>
                {#if showLoadingScreen}
                    <section class="absolute top-0 left-0 bg-black/70 w-full h-full flex flex-col justify-center items-center gap-2 rounded-xl">
                        <Circle color="#fff"/>
                        <p class="text-white">{loadingStatement}</p>
                    </section>
                {/if}
            </form>
        </section>
    {/if}
</main>