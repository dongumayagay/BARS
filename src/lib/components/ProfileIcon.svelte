<script>
    import {createEventDispatcher} from "svelte";
    import {currentPage,currentInterface,userStore} from "$lib/stores.js";

    const dispatch = createEventDispatcher();

    let showDropdown = false

</script>

<div class="dropdown dropdown-end " class:lg:hidden={$currentInterface === "client" && $userStore === null}>
    <button class="btn btn-sm w-max h-max indicator" on:click={()=>showDropdown=!showDropdown}>
        <span class="indicator-item badge badge-success top-[20%] right-[25%] z-0" class:hidden={$userStore == null}></span> 
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </button>
    {#if $currentInterface === "admin"}
    <ul class="dropdown-content menu shadow-lg bg-neutral rounded-box{!!$userStore ? " w-[60vw] lg:w-[300px] ": " w-max "}h-max border-2 p-2" class:hidden={!showDropdown}>
        {#if !!$userStore}
        <div class="w-full flex flex-col items-center border-b-2">
            {#if !!$userStore.displayName}
                <p class="font-semibold">{$userStore.displayName}</p>
            {/if}
            <small class="font-light">{$userStore.email}</small>
        </div>
        {/if}
        <li>
            <button class="w-full flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("logout"); showDropdown=false}}>
                <small>Log Out</small>
            </button>
        </li>
      <li><button class="flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("openSettings"); showDropdown=false}}>
            <small>Account Settings</small>
      </button></li>
    </ul>
    {:else}
    <ul class="dropdown-content menu shadow-lg bg-neutral rounded-box{!!$userStore ? " w-[60vw] lg:w-[300px] ": " w-max "}h-max border-2 p-2" class:hidden={!showDropdown}>
        {#if !!$userStore}
        <div class="w-full flex flex-col items-center border-b-2">
            {#if !!$userStore.displayName}
                <p class="font-semibold">{$userStore.displayName}</p>
            {/if}
            <small class="font-light">{$userStore.email}</small>
        </div>
        <li><button class="w-full flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("logout"); showDropdown=false}}>
                <small class="font-semibold">Log Out</small>
        </button></li>
        <li><button class="flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("openSettings"); showDropdown=false}}>
                <small class="font-semibold">Account Settings</small>
        </button></li>
        {:else}
        <li><button class="w-full flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("login"); showDropdown=false}}>
                <small class="font-semibold">Log In</small>
        </button></li>
        <li><button class="flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("signup"); showDropdown=false}}>
                <small class="font-semibold">Sign Up</small>
        </button></li>
        {/if}
    </ul>
    {/if}
  </div>