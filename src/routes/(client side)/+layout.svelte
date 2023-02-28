<script>
	import { onMount } from "svelte";
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
	import { currentInterface, } from "$lib/stores.js"
	import { auth, db } from "$lib/firebase/client.js"
	import LoginForm from "$lib/components/LoginForm.svelte"
	import Header from "$lib/components/Header.svelte"
	import SignUpForm from "../../lib/components/SignUpForm.svelte";
	import SignUpContactInfo from "../../lib/components/SignUpContactInfo.svelte";
	import DataPrivacyConsent from "../../lib/components/DataPrivacyConsent.svelte";
	import { setDoc, Timestamp, collection, doc } from "firebase/firestore";

	onMount(()=>{
		$currentInterface = "client";
	})

	const title = 'Welcome !!';
	const links = [
		{
			path: './',
			name: 'Homepage'
		},
		{
			path: '/document-request',
			name: 'Request Documents'
		},
		{
			path: '/appointment-request',
			name: 'Make an Appointment'
		},
		{
			path: '/ticket-tracker',
			name: 'Ticket Tracker'
		}
	]

	let showLoginForm = false;
	let showSignUpForm = false;
	let showConsentModal = false;
	let consentAgreed = false;
	let signUpStep = 0;
	let signUpDetails = {};

	function submitHandler(event) {
        signInWithEmailAndPassword(auth, event.detail.email, event.detail.password)
            .then(() => {
                alert("Logged In Successfully")
				showLoginForm = false;
            })
            .catch((error) => {
                alert(error.message)
            })
    }

	function nextHandler(event){
		signUpDetails = Object.assign(signUpDetails, event.detail)
		console.log(signUpDetails)
		if(signUpStep === 1 && !consentAgreed){
			showConsentModal = true
		} else if (signUpStep === 1 && consentAgreed) {
			console.log("We are creating your BARS account. This might take a while....")
			createAccountHandler()
		} else {
			signUpStep++
		}
	}

	async function createAccountHandler(){
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, signUpDetails.email, signUpDetails.password)
			await updateProfile(userCredential.user, {
				displayName: signUpDetails.username,
			})
			const userFirestoreDetails = await setDoc(doc(db, "users", userCredential.user.uid), {
				...signUpDetails.contactInfo,
				dateCreated: Timestamp.now(),
			})
			showSignUpForm = false;
		} catch (error) {
			alert(error.message)
		}
	}

</script>

<Header {title} {links} on:login={()=>showLoginForm=true} on:signup={()=>showSignUpForm=true}/>

{#if showLoginForm}
<section class="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-base-200 to-base-100 flex flex-col items-center justify-center z-30">
	<div class="w-full lg:w-[500px] flex items-center">
		<button class="btn btn-ghost hover:bg-transparent text-white group" on:click={()=>showLoginForm=false}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
			<p class="group-hover:underline">Close</p>
		</button>
	</div>
	<LoginForm title={"Login"} on:submit={submitHandler}/>
</section>
{/if}
{#if showSignUpForm}
<section class="absolute top-0 left-0 overflow-y-auto w-screen h-[180vh] bg-gradient-to-b from-base-200 to-base-100 flex flex-col items-center z-30 pt-10">
	<div class="w-full lg:w-[500px] flex items-center">
		<button class="btn btn-ghost hover:bg-transparent text-white group" on:click={()=>showSignUpForm=false}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
			<p class="group-hover:underline">Close</p>
		</button>
	</div>
	<div class="h-full flex justify-center relative">
		<SignUpForm {signUpStep} on:next={nextHandler}/>
		<SignUpContactInfo {signUpStep} on:next={nextHandler} />
		<div class="w-full h-full" class:hidden={!showConsentModal}>
			<DataPrivacyConsent on:agree={()=>{consentAgreed=true; showConsentModal=false}} on:close={()=>showConsentModal=false} on:decline={()=>showConsentModal=false}/>
		</div>
	</div>
</section>
{/if}
	
	
<slot />