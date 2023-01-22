<script>
    import { auth } from "$lib/firebase/client.js"
    import { adminUser } from "$lib/stores.js";
    import { goto } from "$app/navigation";

    import LoginForm from "$lib/components/LoginForm.svelte"

    import { signInWithEmailAndPassword } from "firebase/auth";

    // let email;
    // let password;

    async function submitHandler(event) {
        await signInWithEmailAndPassword(auth, event.detail.email, event.detail.password)
            .then((userCredential) => {
                $adminUser = userCredential.user;
                console.log($adminUser)
                goto('../admin/dashboard')
            })
            .catch((error) => {
                const errorMessage = error.message;
            })

        console.log(event.detail)
    }
</script>

<main class="w-full h-full flex justify-center items-center">
    <LoginForm on:submit={submitHandler}/>
</main>