<script>
	import { onMount } from "svelte";
	import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
	import { currentInterface, userStore } from "$lib/stores.js"
	import { auth, db } from "$lib/firebase/client.js"
	import { setDoc, Timestamp, collection, doc } from "firebase/firestore";
	import LoginForm from "$lib/components/LoginForm.svelte"
	import Header from "$lib/components/Header.svelte"
	import SignUpForm from "../../lib/components/SignUpForm.svelte";
	import SignUpContactInfo from "../../lib/components/SignUpContactInfo.svelte";
	import DataPrivacyConsent from "../../lib/components/DataPrivacyConsent.svelte";
	import CloseButton from "./client-account-settings-components/CloseButton.svelte";
	import AccountCredentials from "./client-account-settings-components/AccountCredentials.svelte";
	import Password from "./client-account-settings-components/Password.svelte";
	import BasicInfo from "./client-account-settings-components/BasicInfo.svelte";
	import Otp from "../../lib/components/OTP.svelte";

	onMount(()=>{
		$currentInterface = "client";
	})

	const title = 'Welcome!!';
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

	// Auth and SignUp Variables
	let showLoginForm = false;
	let showSignUpForm = false;
	let showConsentModal = false;
	let emailVerified = false;
	let consentAgreed = false;
	let showOTPModal = false;
	let signUpStep = 0;
	let verifiedEmail
	let signUpDetails = {};

	// Account Settings Variables
	let showSettings = false;
	let otherModalOpened = false;

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
		if(signUpStep === 0 && (!emailVerified || (!!verifiedEmail && event.detail.email !== verifiedEmail))){
			showOTPModal = true
		} else if(signUpStep === 1 && !consentAgreed) {
			showConsentModal = true
		} else if (signUpStep === 1 && consentAgreed) {
			console.log("We are creating your BARS account. This might take a while....")
			createAccountHandler()
		} else {
			signUpStep++
		}
	}

	function emailVerifier(event){
        emailVerified =  true;
        verifiedEmail = event.detail;
        showOTPModal = false;
        alert("Your Email has been verified")
        signUpStep++;
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

<Header {title} {links} on:login={()=>showLoginForm=true} on:signup={()=>showSignUpForm=true} on:showSettings={()=>showSettings = true}/>

{#if showLoginForm}
<section class="fixed top-0 left-0 w-screen h-screen bg-gradient-to-b from-base-200 to-base-100 flex flex-col items-center justify-center z-30">
	<div class="w-full lg:w-[500px] flex items-center">
		<button class="btn btn-ghost hover:bg-transparent group" on:click={()=>showLoginForm=false}>
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
		<button class="btn btn-ghost hover:bg-transparent group" on:click={()=>showSignUpForm=false}>
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
			<p class="group-hover:underline">Close</p>
		</button>
	</div>
	<div class="h-full flex justify-center relative">
		<SignUpForm {signUpStep} on:next={nextHandler}/>
		{#if showOTPModal}
        	<Otp email={signUpDetails.email??""} on:emailVerified={emailVerifier} on:close={()=>showOTPModal=false}/>
        {/if}
		<SignUpContactInfo {signUpStep} on:next={nextHandler} on:back={()=>signUpStep--}/>
		<div class="w-full h-full" class:hidden={!showConsentModal}>
			<DataPrivacyConsent on:agree={()=>{consentAgreed=true; showConsentModal=false}} on:close={()=>showConsentModal=false} on:decline={()=>showConsentModal=false}/>
		</div>
	</div>
</section>
{/if}
	
{#if showSettings}
	<main class="absolute top-0 left-0 w-screen min-h-[200%] h-max flex flex-col items-center gap-6 bg-gradient-to-b from-base-200 to-base-100 z-100">
		<CloseButton on:closeSettings={()=>showSettings=false}/>
		<AccountCredentials {otherModalOpened} on:open={()=>otherModalOpened=true} on:close={()=>otherModalOpened=false}/>
		<Password {otherModalOpened} on:open={()=>otherModalOpened=true} on:close={()=>otherModalOpened=false}/>
		<BasicInfo {otherModalOpened} on:open={()=>otherModalOpened=true} on:close={()=>otherModalOpened=false}/>
	</main>
{:else}
	<slot/>
{/if}