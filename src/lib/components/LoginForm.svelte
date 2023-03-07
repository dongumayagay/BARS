<script>
    import { createEventDispatcher } from "svelte";

    export let title;
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

<form class="w-[85vw] h-[60vh] lg:w-[400px] lg:h-[500px] p-10 pt-8 bg-neutral flex flex-col justify-center gap-10 rounded-xl shadow-lg" on:submit|preventDefault={submitHandler}>
    <p class="w-full text-center text-lg font-sans font-semibold">{title}</p>
    <div class="w-full flex flex-col gap-4">
        <input type="email" placeholder="Email" class="input input-bordered input-ghost focus:border-primary focus:ring-0 focus:bg-neutral" required bind:value={email} >
        <input type="password" placeholder="Password" class="input input-bordered input-ghost focus:border-primary focus:ring-0 focus:bg-neutral" required bind:value={password}>
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
</form>