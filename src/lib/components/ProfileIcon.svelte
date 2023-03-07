<script>
    import {createEventDispatcher} from "svelte";
    import {currentPage,currentInterface,userStore} from "$lib/stores.js";

    const dispatch = createEventDispatcher();

    let showDropdown = false

</script>

<div class="dropdown dropdown-end " class:lg:hidden={$currentInterface === "client" && $userStore === null}>
    <button class="btn btn-sm w-max h-max" on:click={()=>showDropdown=!showDropdown}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
    </button>
    {#if $currentInterface === "admin"}
    <ul class="dropdown-content menu shadow-lg bg-neutral rounded-box w-max h-max border-2" class:hidden={!showDropdown}>
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
    <ul class="dropdown-content menu shadow-lg bg-neutral rounded-box w-max h-max border-2" class:hidden={!showDropdown}>
        {#if $userStore}
        <li><button class="w-full flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("logout"); showDropdown=false}}>
                <small>Log Out</small>
        </button></li>
        <li><button class="flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("openSettings"); showDropdown=false}}>
                <small>Account Settings</small>
        </button></li>
        {:else}
        <li><button class="w-full flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("login"); showDropdown=false}}>
                <small>Log In</small>
        </button></li>
        <li><button class="flex justify-center hover:bg-neutral hover:underline" on:click={()=>{dispatch("signup"); showDropdown=false}}>
                <small>Sign Up</small>
        </button></li>
        {/if}
    </ul>
    {/if}
  </div>