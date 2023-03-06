<script>
    import { userStore } from "$lib/stores.js"
    import { createEventDispatcher } from "svelte";
    import { auth } from "$lib/firebase/client.js"
    import { reauthenticateWithCredential, updatePassword } from "firebase/auth";
	import PasswordEditor from "../../../lib/components/account-settings-components/PasswordEditor.svelte";

    export let otherModalOpened;

    const dispatch = createEventDispatcher();

    let enableEdit = false
    // let showPasswordModal = false;
    let showLoadingScreen = false;
    let loadingStatement = "";

    function updateHandler(event){
        console.log(event.detail)
        showLoadingScreen = true;
        const currentUser = auth.currentUser;
        loadingStatement = "Re-authenticating user..."
        reauthenticateWithCredential(currentUser, event.detail.credential)
        .then(()=>{
            // alert("Re-authentication Success!")
            loadingStatement = "Saving your new password..."
            updatePassword(currentUser, event.detail.newPassword)
            .then(()=>{
                loadingStatement = "Refreshing webpage...";
                window.location.reload();
            })
        }).catch((error)=>{
            // alert(error.message)
            switch(error.message){
                case "Firebase: Error (auth/wrong-password).":
                    alert("Wrong password, try again");
                    break;
                default:
                    alert(error.message);
                    break;
            }
            showLoadingScreen = false;
        })
        console.log($userStore)
    }

</script>

{#if !enableEdit}
<section class="w-[80%] lg:w-1/2 h-max flex flex-col gap-4 bg-neutral p-4 z-100 rounded-xl shadow-lg" class:hidden={otherModalOpened}>
    <button class="flex justify-between border-b-2 border-transparent hover:border-inherit group p-2" on:click={()=>{enableEdit=true; dispatch("open")}}>
        <p class="lg:w-1/3 text-start font-semibold">Change Password</p>
        <!-- <p class="w-full">Click EDIT to change</p> -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
    </button>
</section>
{/if}
{#if enableEdit}
 <PasswordEditor {showLoadingScreen} {loadingStatement} on:updatePassword={updateHandler} on:close={()=>{enableEdit=false; dispatch("close")}}/>
{/if}