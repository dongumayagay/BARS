<script>
    import { auth } from "$lib/firebase/client.js"
    import { userStore } from "$lib/stores.js";
    import { goto } from "$app/navigation";

    import LoginForm from "$lib/components/LoginForm.svelte"

    import { signInWithEmailAndPassword } from "firebase/auth";
	import { onMount } from "svelte";

    onMount(()=>{
        if(!!$userStore){
            goto("../admin/dashboard")
        }
    })

    function submitHandler(event) {
        signInWithEmailAndPassword(auth, event.detail.email, event.detail.password)
            .then(() => {
                alert("Logged In Successfully")
                goto('../admin/dashboard')
            })
            .catch((error) => {
                alert(error.message)
            })

        console.log(event.detail)
    }
</script>

<main class="w-full h-full flex justify-center items-center">
    {#if !$userStore}
        <LoginForm on:submit={submitHandler}/>
        
    {/if}
</main>