<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let email;
    let password;

    function submitHandler() {
        dispatch("submit", {
            email, password
        })
        // console.log(inputs)
    }
</script>

<form class="w-[400px] h-[500px] p-10 bg-neutral flex flex-col justify-center gap-10 rounded-xl shadow-lg" on:submit|preventDefault={submitHandler}>
    <div class="w-full flex flex-col gap-4">
        <input type="email" placeholder="Email" class="input input-bordered input-ghost focus:border-primary focus:ring-0 focus:bg-neutral" required bind:value={email} >
        <input type="password" placeholder="Password" class="input input-bordered input-ghost focus:border-primary focus:ring-0 focus:bg-neutral" required bind:value={password}>
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
</form>