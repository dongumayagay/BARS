<script>
    import { sendEmail } from '$lib/utils';
    import { createEventDispatcher } from 'svelte';

    export let email, showOTPModal;

    const dispatch =  createEventDispatcher();

    let code;
    let codeInput = "";
    let resendTimer = 30;
    let errorMessage = "";

    async function sendCode() {
        code = JSON.stringify(Math.floor(Math.random() * 999999))
		const result = await sendEmail({
			to: email,
			subject: 'Document Request Email Verification',
			html: '<p>Your verification code: ' + code + '</p>'
		});

        console.log(JSON.stringify(result))
	}

    function submitHandler(){
        if(codeInput === code){
            code = undefined;
            dispatch("emailVerified", email);
        } else {
            errorMessage = "Wrong code, please try again";
            setTimeout(()=>{
                errorMessage = "";
            }, 3000)
        }
    }

    function resendHandler(){
        resendTimer = 30;
        sendCode()
    }

    $: if(!!email) sendCode();

    $: if(!!email && resendTimer !== 0){
        setTimeout(()=>{
            resendTimer -= 1;
        }, 1000)
    }

    // $: if(codeInput === code) );
</script>

<form class="w-screen h-screen fixed flex items-center justify-center top-0 left-0 bg-black/70 z-20" class:hidden={!showOTPModal} on:submit|preventDefault={submitHandler}>
    <div class="bg-neutral flex flex-col w-[80vw] lg:w-[50vw] gap-2 rounded-xl p-4">
        <div class="w-full flex justify-between ">
            <h3 class="font-bold text-lg">Email Verification</h3>
            <button type="button" class="hover:scale-105" on:click={()=>dispatch("close")}> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
        <small class="py-4 text-center text-info">To ensure that we will notify you regarding your request's status, we need to verify your email.</small>
        <small class="w-full text-center">A code has been sent to:</small>
        <small class="w-full text-center font-bold underline">{email}</small>
        <div class="w-full flex flex-col items-center justify-center">
            <input type="text" id="code" class="w-max input input-ghost text-center focus:bg-neutral" placeholder="Enter code" maxlength="6" bind:value={codeInput}>
            <label for="code" class="h-[50px] text-error">{errorMessage}</label>
        </div>
        <div class="w-full flex justify-center gap-2">
            <button type="submit" class="btn btn-info">Confirm</button>
            <button type="button" class="btn disabled:text-black/40" disabled={resendTimer > 0} on:click={resendHandler}>
                <p>Resend {resendTimer > 0 ? resendTimer + "s": ""}</p> 
            </button>
        </div>
    </div>
</form>