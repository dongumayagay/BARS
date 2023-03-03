<script>
    import { auth } from "$lib/firebase/client.js"
    import { userStore, adminUsers } from "$lib/stores.js";
    import { goto } from "$app/navigation";

    import LoginForm from "$lib/components/LoginForm.svelte"

    import { signInWithEmailAndPassword, signOut } from "firebase/auth";

    // let ifAdmin;

    // $: ifAdmin = $adminUsers.find((item)=> $userStore.email === item.email)

    $:  if(!!$userStore && $userStore.email === "user@sample.com"){
            console.log("Redirecting to dashboard")
            goto("../admin/dashboard")
        }
    // $: if($userStore.email !== "user@sample.com"){
    //     signOut(auth)
    // }
    function submitHandler(event) {
        if(event.detail.email !== "user@sample.com"){
            signOut(auth)
        }
        if(event.detail.email === "user@sample.com"){
            signInWithEmailAndPassword(auth, event.detail.email, event.detail.password)
            .then(() => {
                alert("Logged In Successfully")
                goto('../admin/dashboard')
            })
            .catch((error) => {
                alert(error.message)
            })
        } else {
            alert("Sorry, you are not authorized to log in here")
        }

        console.log(event.detail)
    }
</script>

<main class="w-full h-full flex justify-center items-center">
    {#if !$userStore || $userStore !== "user@sample.com"}
        <LoginForm title={'Admin Login'} on:submit={submitHandler}/>
        
    {/if}
</main>