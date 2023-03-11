<script>
    import { auth, db } from "$lib/firebase/client.js"
    import { userStore, adminUsers } from "$lib/stores.js";
    import { goto } from "$app/navigation";

    import LoginForm from "$lib/components/LoginForm.svelte"

    import { signInWithEmailAndPassword, signOut } from "firebase/auth";
	import { collection, getDocs, getDoc, where, doc, query } from "firebase/firestore";

    async function ifAdmin(){
        try {
            if(!!$userStore){
                const isAdmin = await getDoc(doc(db, "adminUsers", $userStore.uid))
                return isAdmin.exists();
            }
        } catch (error) {
            alert(error.message)
        }
	}

    $:  if(!!$userStore && ifAdmin()){
            console.log("Redirecting to dashboard")
            goto("../admin/dashboard")
        }
    async function submitHandler(event) {
        const isAdmin = await getDocs(query(collection(db, "adminUsers"), where("email", "==", event.detail.email)))
        if(isAdmin.empty){
            alert("Sorry, you are not authorized to log in here")
            // signOut(auth)
        }else{
            signInWithEmailAndPassword(auth, event.detail.email, event.detail.password)
            .then(() => {
                alert("Logged In Successfully")
                goto('../admin/dashboard')
            })
            .catch((error) => {
                alert(error.message)
            })
        }

        console.log(event.detail)
    }
</script>

<main class="w-full h-full flex justify-center items-center">
    {#if !$userStore || !ifAdmin()}
        <LoginForm title={'Admin Login'} on:submit={submitHandler}/>
    {/if}
</main>