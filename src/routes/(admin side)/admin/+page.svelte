<script>
    import { auth, db } from "$lib/firebase/client.js"
    import { userStore, adminUsers } from "$lib/stores.js";
    import { goto } from "$app/navigation";

    import LoginForm from "$lib/components/LoginForm.svelte"

    import { signInWithEmailAndPassword, signOut } from "firebase/auth";
	import { collection, getDocs, getDoc, where, doc, query } from "firebase/firestore";

    // let ifAdmin;

    // $: ifAdmin = $adminUsers.find((item)=> $userStore.email === item.email)
    async function ifAdmin(){
        // if(!!$userStore){
            try {
                if(!!$userStore){
                    const isAdmin = await getDoc(doc(db, "adminUsers", $userStore.uid))
                    return isAdmin.exists();
                }
            } catch (error) {
                alert(error.message)
            }
        // }
        // if(!$userStore){
            
        // }
	}

    // async function ifNotAdmin(inputEmail){
    //     const isAdmin = await getDocs(query(collection(db, "adminUsers"), where("email", "==", inputEmail)))
    //     alert(isAdmin.size !== 0)
    //     return isAdmin.size !== 0
    // }

    $:  if(!!$userStore && ifAdmin()){
            console.log("Redirecting to dashboard")
            goto("../admin/dashboard")
        }
    // $: if($userStore.email !== "user17@sample.com"){
    //     signOut(auth)
    // }
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
        // else {
        //     alert("Sorry, you are not authorized to log in here")
        // }

        console.log(event.detail)
    }
</script>

<main class="w-full h-full flex justify-center items-center">
    {#if !$userStore || !ifAdmin()}
        <LoginForm title={'Admin Login'} on:submit={submitHandler}/>
    {/if}
</main>