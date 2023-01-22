<script>
	import HotlineCard from "./HotlineCard.svelte";

    const hotlinesList = [
        {
            name: "Barangay United Bayanihan Office",
            number: "(02) 8808 0617",
            iconClassName: "text-[40px] fa-solid fa-building"
        },
        {
            name: "San Pedro City Police Department",
            number: "0998 598 5639",
            iconClassName: "text-[40px] fa-solid fa-building-shield"
        },
        {
            name: "San Pedro City Fire Department",
            number: "(02) 8808 0617",
            iconClassName: "text-[40px] fa-solid fa-fire"
        },
        { 
            name: "Muncipal Health Office",
            number: "(02) 8808 0617",
            iconClassName: "text-[40px] fa-solid fa-house-medical"
        },
        {
            name: "Ambulance",
            number: "(02) 8808 0617",
            iconClassName: "text-[40px] fa-solid fa-truck-medical"
        },
    ]
</script>

<svelte:head>
    <title>Homepage - Emargency Hotlines | B.A.R.S.</title>
</svelte:head>

<section class="w-full lg:w-[70%] flex flex-col items-center gap-6 px-6">
    {#each hotlinesList as hotline}
        <HotlineCard {hotline}/>
    {/each}
</section>



