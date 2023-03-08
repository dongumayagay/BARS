<script>
    import { createEventDispatcher } from "svelte";

    export let signUpStep;

    const dispatch = createEventDispatcher();

    let showPassword = false;

    let username, email, password, confirmPassword;

    function submitHandler(){
        dispatch("next", {
            username, email, password
        })
    }
</script>

<form class="absolute w-[85vw] min-h-[70vh] lg:w-[40vw] h-max bg-neutral flex flex-col rounded-lg shadow-xl p-6" on:submit|preventDefault={submitHandler} class:hidden={signUpStep!==0} >
    <div class="w-full h-max flex flex-col items-center gap-2 py-4">
        <p class="text-xl text-secondary font-bold font-sans text-center">Create your own B.A.R.S account</p>
        <small class="text-center">To get extra features such as autofill on all our forms, requests and transaction history, etc.</small>
    </div>
    <div class="w-full h-full flex flex-col gap-4">
        <div class="w-full flex flex-col border-b-2 border-primary gap-2">
            <label for="#username" class="font-semibold">Username</label>
            <input type="text" id="username" class="input bg-transparent focus:bg-transparent focus:outline-0 autofill:bg-transparent" placeholder="Type here" bind:value={username}>
        </div>
        <div class="w-full flex flex-col border-b-2 border-primary gap-2">
            <label for="#email" class="font-semibold">Email</label>
            <input type="email" id="email" class="input bg-transparent focus:bg-transparent focus:outline-0 autofill:bg-transparent" placeholder="example@provider.com" bind:value={email}>
        </div>
        <div class="flex flex-col gap-2">
            <div class="w-full flex flex-col border-b-2 border-primary gap-2">
                <label for="#password" class="font-semibold">Password</label>
                <input type="password" minlength="8" maxlength="15" class="input bg-transparent focus:bg-transparent focus:outline-0 autofill:bg-transparent" placeholder="Must be 8-15 characters" class:hidden={showPassword} bind:value={password}>
                <input type="text" minlength="8" maxlength="15" class="input bg-transparent focus:bg-transparent focus:outline-0 autofill:bg-transparent" class:hidden={!showPassword} placeholder="Must be 8-15 characters" bind:value={password}>
            </div>
            <label for="#password" class="flex items-center gap-2">
                <input type="checkbox" class="checkbox checkbox-sm checkbox-primary" bind:checked={showPassword}>
                <p>Show Password</p>
            </label>
        </div>
        <div class="flex flex-col gap-2">
            <div class="w-full flex flex-col border-b-2 border-primary gap-2">
                <label for="#password" class="font-semibold">Re-type Password</label>
                <input type="password" minlength="8" maxlength="15" class="input bg-transparent focus:bg-transparent focus:outline-0 autofill:bg-transparent" placeholder="Please type your password again to confirm" class:input-error={!!confirmPassword && confirmPassword !== password} bind:value={confirmPassword}>
            </div>
            <label for="#password" class="label-text-alt text-error" class:block={!!confirmPassword && confirmPassword !== password}>This field must be the same as your password</label>
        </div>
    </div>
    <div class="w-full flex items-center gap-2 h-20% p-4">
        <button type="submit" class="btn btn-success" disabled={confirmPassword !== password}>Next</button>
        <button type="reset" class="btn btn-ghost" on:click={(event)=>event.target.reset}>Clear Form</button>
    </div>
</form>