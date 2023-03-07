<script>
    import { createEventDispatcher, onMount } from "svelte";
    import { EmailAuthProvider } from "firebase/auth";
    import { userStore } from "$lib/stores.js"
	import { Circle } from "svelte-loading-spinners";
    
    // export let email, username;
    export let showLoadingScreen;
    export let loadingStatement;
    export let userBasicInfo;
    
    let confirmPassword;
    let othersCivilStatus, othersNationality;
    
    const dispatch = createEventDispatcher();
    
    let showPasswordModal = false;

    function submitHandler(){
        const credential = EmailAuthProvider.credential($userStore.email, confirmPassword);
        if(userBasicInfo.civilStatus === "others") {userBasicInfo.civilStatus = othersCivilStatus}
        if(userBasicInfo.nationality === "others") {userBasicInfo.nationality = othersNationality}
        console.log(userBasicInfo)
        dispatch("update", {
            credential, 
            userBasicInfo
        })
    }
</script>

<main class="absolute top-0 left-0 w-screen h-max  bg-gradient-to-b from-base-200 to-base-100 flex flex-col items-center py-6 z-20">
    <form class="w-[80%] lg:w-1/2 h-max flex flex-col gap-4 bg-neutral p-4 z-20 rounded-xl shadow-xl" on:submit|preventDefault={()=>showPasswordModal=true}>
        <div class="w-full  border-b-[1px] border-base-300 flex justify-center items-center relative">
            <p class="font-semibold label-text p-2">Edit Account Credentials</p>
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
        <div class="w-full flex flex-col items-center justify-center border-transparent border-b-2 hover:border-inherit gap-2">
            <label for="#firstname" class="font-bold label-text">First Name</label>
            <input required type="text" id="firstname" placeholder="Type Here" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center" bind:value={userBasicInfo.firstName}>
        </div>
        <div class="w-full flex flex-col items-center justify-center border-transparent border-b-2 hover:border-inherit gap-2">
            <label for="#middlename" class="font-bold label-text">Middle Name</label>
            <input type="text" id="middlename" placeholder="Type Here (optional)" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center" bind:value={userBasicInfo.middleName}>
        </div>
        <div class="w-full flex flex-col items-center justify-center border-transparent border-b-2 hover:border-inherit gap-2">
            <label for="#lastname" class="font-bold label-text">Last Name</label>
            <input required type="text" id="lastname" placeholder="Type Here" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center" bind:value={userBasicInfo.lastName}>
        </div>
        <div class="w-full flex flex-col items-center justify-center border-transparent border-b-2 hover:border-inherit gap-2">
            <label for="#suffix" class="font-bold label-text">Suffix/es</label>
            <input type="text" id="suffix" placeholder="Type Here (optional)" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center" bind:value={userBasicInfo.suffix}>
        </div>
        <div class="w-full flex flex-col items-center justify-center border-transparent border-b-2 hover:border-inherit gap-2">
            <label for="#address" class="font-bold label-text">Complete Address</label>
            <input required type="text" id="address" placeholder="Type Here" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center" bind:value={userBasicInfo.address}>
        </div>
        <div class="w-full flex flex-col items-center justify-center border-transparent border-b-2 hover:border-inherit gap-2 relative">
            <label for="#birthdate" class="font-bold label-text">Birthdate</label>
            <input required type="date" id="birthdate" placeholder="Type Here" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center z-20" bind:value={userBasicInfo.birthdate}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 absolute top-[45%] right-[14px] z-10">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
        </div>
        <div class="w-full flex flex-col items-center justify-center {userBasicInfo.civilStatus === "others" ? "border-transparent border-b-2 hover:border-inherit" : ""} gap-2">
            <label for="#civilStatus" class="font-bold label-text">Civil Status</label>
            <select required type="text" id="civilStatus" placeholder="Type Here" class=" select select-ghost hover:select-bordered bg-transparent text-center" bind:value={userBasicInfo.civilStatus}>
                <option value="" disabled selected>Select One</option>
                <option value="Single" >Single</option>
                <option value="Married" >Married</option>
                <option value="Separated" >Separated</option>
                <option value="Widowed" >Widowed</option>
                <option value="others" >Others</option>
            </select>
            {#if userBasicInfo.civilStatus === "others"}
                <input required type="text" id="specify" class="w-full lg:w-max input input-ghost bg-transparent border-b-2 focus:bg-transparent text-center" placeholder="Please specify" bind:value={othersCivilStatus}>
            {/if}
        </div>
        <div class="w-full flex flex-col items-center justify-center gap-2">
            <label for="#nationality" class="font-bold label-text">Nationality</label>
            <select required type="text" id="nationality" placeholder="Type Here" class=" select select-ghost hover:select-bordered bg-transparent text-center" bind:value={userBasicInfo.nationality}>
                <option value="" disabled selected>Select One</option>
                <option value="Filipino" selected>Filipino</option>
                <option value="others" >Others</option>
            </select>
            {#if userBasicInfo.nationality === "others"}
              <input required type="text" id="specify" class="w-full lg:w-max input input-ghost bg-transparent border-b-2 focus:bg-transparent text-center" placeholder="Please specify" bind:value={othersNationality}>
            {/if}
        </div>
        <div class="w-full flex flex-col items-center justify-center border-transparent border-b-2 hover:border-inherit gap-2">
            <label for="#contactNo" class="font-bold label-text">Phone Number</label>
            <input required type="text" id="contactNo" placeholder="Type Here" class="w-full input input-ghost hover:border-b-2 bg-transparent text-center" bind:value={userBasicInfo.contactNo}>
        </div>
        <div class="w-full flex justify-end">
            <button type="submit" class="btn btn-success gap-2">
                <i class="fa-solid fa-floppy-disk text-xl"></i>
                <p>Save</p>
            </button>
        </div>
    </form>
    {#if showPasswordModal}
        <section class="fixed w-screen h-screen top-0 bg-black/70 flex justify-center items-center z-20">
            <form class="w-1/2 flex bg-neutral flex-col items-center gap-4 rounded-xl p-4 relative" on:submit|preventDefault={submitHandler}>
                <div class="w-full flex ">
                    <button type="button" class="btn btn-ghost hover:bg-transparent" on:click={()=>showPasswordModal=false}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <p>Close</p>
                    </button>
                </div>
                <div class="w-full flex flex-col items-center gap-2">
                    <p class="font-bold label-text">Enter current password</p>
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