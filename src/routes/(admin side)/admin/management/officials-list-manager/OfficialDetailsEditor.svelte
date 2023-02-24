<script>
	import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
    import { db } from "$lib/firebase/client.js"
    import { createEventDispatcher } from "svelte";
	import PasswordModal from "./editor-components/PasswordModal.svelte";
	import LoadingScreen from "./editor-components/LoadingScreen.svelte";

    export let officialDetails;
    export let isAdd;

    const dispatch = createEventDispatcher();

    let showLoadingScreen = false;
    let showPasswordModal = false;
    let isSaveAction;

    async function submitHandler(){
        showLoadingScreen = true;
        try {
            if(isAdd){
                console.log({...officialDetails})
                const addOfficialRef =  await addDoc(collection(db, "officialsList"),{
                    ...officialDetails
                })
            } else {
                const updateOfficialRef = await updateDoc(doc(db, "officialsList", officialDetails.id),{
                    ...officialDetails
                })
            }
        } catch (error) {
            alert(error.message)
        }
        showLoadingScreen = false;
        dispatch("close")
    }

    async function deleteHandler(){
        showLoadingScreen = true;
        try {
            const deletedOfficialRef = await deleteDoc(doc(db, "officialsList", officialDetails.id))
        } catch (error) {
            alert(error.message)
        }
        showLoadingScreen = false;
        dispatch("close")
    }

    function verificationHandler(actionBoolean){
        isSaveAction = actionBoolean;
        showPasswordModal = true;
    }
</script>

<section class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/40">
    <form class="w-[70%] min-h-[70%] h-max bg-neutral p-6 rounded-xl shadow-xl relative" on:submit|preventDefault={submitHandler}>
        <div class="w-full flex justify-between p-2">
            <button type="button" class="btn btn-ghost hover:bg-transparent hover:scale-110 group p-2" on:click={()=>dispatch("close")}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 font-bold">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <p>{isAdd ? "Close" : "Cancel"}</p>
            </button>
            <button type="button" class="w-max btn btn-error btn-sm gap-2" disabled={officialDetails.isAdd} on:click={deleteHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                <p>Remove from the List</p>
            </button>
        </div>
        <div class="w-full flex flex-col items-center gap-2">
            <div class="w-full flex flex-col items-center gap-2 border-b-2">
                <p class="font-semibold">{officialDetails.position}'s Name:</p>
                <input type="text" class="w-full text-center input input-ghost focus:bg-transparent focus:outline-0" placeholder="Type Here" required bind:value={officialDetails.name}>
            </div>
            <div class="w-full flex justify-center py-1">
                {#if !!officialDetails.facebook || officialDetails.facebook === ""}
                <div class="w-full flex flex-col items-center">
                    <p class="font-semibold text-blue-800">Facebook Account Link:</p>
                    <div class="w-full flex justify-center items-center gap-2">
                        <i class="fa-brands fa-facebook text-[30px] text-blue-800 dark:text-info"></i>
                        <input type="url" pattern="https://www.facebook.com/.*" placeholder="https://www.facebook.com" class="w-[50%] text-center input input-ghost focus:bg-transparent" required bind:value={officialDetails.facebook}>
                        <button type="button" class="btn btn-ghost hover:btn-error btn-sm" on:click={()=> officialDetails.facebook = undefined}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
                {:else}
                <button type="button" class="btn btn-ghost hover:bg-transparent hover:scale-105 hover:border-none hover:outline-none gap-2" on:click={()=>officialDetails.facebook=""}>
                    <i class="fa-brands fa-facebook text-[30px] text-blue-800 dark:text-info"></i>
                    <p class="text-blue-800 dark:text-info">Add Facebook</p>
                </button>
                {/if}
            </div>
            <div class="w-full flex justify-center py-1">
                {#if !!officialDetails.email || officialDetails.email === ""}
                <div class="w-full flex flex-col items-center">
                    <p class="font-semibold text-error">E-mail Address:</p>
                    <div class="w-full flex justify-center items-center gap-2">
                        <i class="fa-regular fa-envelope text-error text-[30px]"></i>
                        <input type="email" placeholder="example@provider.com" class="w-[50%] text-center input input-ghost focus:bg-transparent" required bind:value={officialDetails.facebook}>
                        <button type="button" class="btn btn-ghost hover:btn-error btn-sm" on:click={()=> officialDetails.email = undefined}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
                {:else}
                <button type="button" class="btn btn-ghost hover:bg-transparent hover:scale-110 hover:border-none hover:outline-none gap-2" on:click={()=>officialDetails.email = ""}>
                    <i class="fa-regular fa-envelope text-error text-[30px]"></i>
                    <p class="text-error">Add Email</p>
                </button>
                {/if}
            </div>
            <div class="w-full flex justify-center py-1">
                {#if !!officialDetails.phone || officialDetails.phone === ""}
                <div class="w-full flex flex-col items-center">
                    <p class="font-semibold">Phone Number:</p>
                    <div class="w-full flex justify-center items-center gap-2">
                        <i class="fa-solid fa-phone text-[30px]"></i>
                        <input type="tel" placeholder="09*********" class="w-[50%] text-center input input-ghost focus:bg-transparent" required bind:value={officialDetails.phone}>
                        <button type="button" class="btn btn-ghost hover:btn-error btn-sm" on:click={()=> officialDetails.phone = undefined}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
                {:else}
                <button type="button" class="btn btn-ghost hover:bg-transparent hover:scale-110 hover:border-none hover:outline-none gap-2" on:click={()=>officialDetails.phone=""}>
                    <i class="fa-solid fa-phone text-[30px]"></i>
                    <p class="">Add Phone Number</p>
                </button>
                {/if}
            </div>
        </div>
        <div class="w-full flex justify-end gap-2">
            <button type="submit" class="btn btn-success flex gap-2">
                <p>Save</p>
                <i class="fa-solid fa-floppy-disk text-xl"></i>
            </button>
        </div>
        {#if showPasswordModal}
            <PasswordModal {isSaveAction}/>
        {/if}
        {#if showLoadingScreen}
        <LoadingScreen name={officialDetails.name}/>
        {/if}
    </form>
</section>