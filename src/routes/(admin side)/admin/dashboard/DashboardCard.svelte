<script>

    export let requestsCount;
    // export let cardColor;
    export let title;

    const cardColors =[
        "primary", "blue-400", "green-400"
    ]

</script>

<section class="w-[90%] flex flex-col justify-between p-2 bg-primary justify-self-center rounded-xl shadow-xl hover:scale-110 transition-all duration-200">
    <small class="h-max p-2 font-semibold">{title}</small>
    <div class="w-full h-full flex justify-center p-4">
        <p class="text-xl font-semibold">{requestsCount}</p>
    </div>
</section>