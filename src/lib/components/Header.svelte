<script>
    export let title = "title placeholder";
    export let links = [
        {
            path: "/",
            name: "Homepage"
        }
    ];
</script>

<div class="flex px-4 bg-white/90 rounded-2xl">
    <section class="py-4 ">
        <!-- logo -->
        <img src="https://via.placeholder.com/100" alt="" class="mask mask-circle">
    </section>
    <section class="flex flex-col flex-1">
        <!--  -->
        <h1 class="flex items-center justify-center flex-1 font-serif text-xl">{title}</h1>
        <nav class="flex items-end flex-1 justify-evenly">
            {#each links  as link}
                <a href={link.path} 
                class="bg-orange-300 border-none rounded-b-none hover:bg-orange-200 btn">
                    {link.name}
                </a>
            {/each}
    </section>
</div>