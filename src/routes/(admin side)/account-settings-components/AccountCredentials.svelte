<script>
    import { userStore } from "$lib/stores.js"
    import { createEventDispatcher } from "svelte";
	import AccountCredentialsEditor from "../../../lib/components/account-settings-components/AccountCredentialsEditor.svelte";
    import { auth, db } from "$lib/firebase/client.js"
    import { reauthenticateWithCredential, updateProfile, updateEmail } from "firebase/auth";
    // import { userStore } from "$lib/stores.js"
	import CloseButton from "./CloseButton.svelte";
	import { doc, updateDoc } from "firebase/firestore";

    export let otherModalOpened;
    
    const dispatch = createEventDispatcher();

    let enableEdit = false;

    // let userCredentials = {};

    // let confirmPassword;
    // let showPasswordModal = false;
    let showLoadingScreen = false;
    let loadingStatement = "";

    // $: userCredentials = {
    //     username: $userStore.displayName??"",
    //     email: $userStore.email,
    //     // newPassword: ""
    
    // }

    function updateHandler(event){
        console.log(event.detail)
        showLoadingScreen = true;
        const currentUser = auth.currentUser;
        loadingStatement = "Re-authenticating user..."
        reauthenticateWithCredential(currentUser, event.detail.credential)
        .then(async ()=>{
            // alert("Re-authentication Success!")
            loadingStatement = "Updating your profile, please wait..."
            updateProfile(currentUser,{ displayName: event.detail.username })
            updateEmail(currentUser, event.detail.email)
            await updateDoc(doc(db, "adminUsers", $userStore.uid),{
                email: event.detail.email
            })
            .then(()=>{
                loadingStatement = "Refreshing webpage...";
                window.location.reload();
                // dispatch("close")
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
    <section class="w-1/2 h-max flex flex-col gap-4 bg-neutral p-4 rounded-xl shadow-xl z-20" class:hidden={otherModalOpened}>
        <div class="w-full flex justify-between items-center border-b-[1px] border-base-300 ">
            <p class="font-semibold p-2">Account Credentials</p>
            <button class="btn btn-ghost btn-sm gap-1 group hover:bg-transparent" on:click={()=>{enableEdit=true; dispatch("open")}}>
                <p class="group-hover:underline">Edit</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </button>
        </div>
        <div class="flex justify-center border-b-2 border-transparent hover:border-inherit group p-2">
            <p class="w-1/3 text-start font-semibold">Username: </p>
            <p class="w-full {!!$userStore.displayName ? "" : "opacity-70"}">{$userStore.displayName??"Click EDIT to add username"}</p>
        </div>
        <div class="flex justify-center border-b-2 border-transparent hover:border-inherit group p-2">
            <p class="w-1/3 text-start font-semibold">Email Address: </p>
            <p class="w-full">{$userStore.email}</p>
        </div>
    </section>
{/if}
{#if enableEdit}
    <AccountCredentialsEditor username={$userStore.displayName} email={$userStore.email} {showLoadingScreen} {loadingStatement} on:close={()=>{enableEdit=false; dispatch("close")}} on:update={updateHandler}/>
{/if}